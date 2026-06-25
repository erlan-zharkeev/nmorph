<script setup lang="ts">
import { NmorphNotificationPlacement } from '@/components/providers';
import type { INmorphNotification, TNmorphNotificationPlacement } from '@/components/providers';
import { NmorphAlert } from '@/components';
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { INmorphInstance } from '@/types';
import { useMergedAttrs } from '@/utils';
import type { INmorphNotificationProviderProps, TNmorphNotificationItem } from './types';

defineOptions({
  inheritAttrs: false,
});

const ANIMATION_DURATION = 500;
const DURATION_TICK_INTERVAL = 250;

const hasNotificationId = (notification: INmorphNotification): notification is TNmorphNotificationItem =>
  typeof notification.id === 'string' && notification.id.length > 0;

const removedIds = ref<string[]>([]);
const closingIds = ref<string[]>([]);
const renderedNotifications = ref<TNmorphNotificationItem[]>([]);
const durationTick = ref(Date.now());
const durationTimers = new Map<string, ReturnType<typeof setTimeout>>();
const durationById = new Map<string, number>();
const durationStartedAtById = new Map<string, number>();
let durationTicker: ReturnType<typeof setInterval> | undefined;
const placementList = Object.values(NmorphNotificationPlacement) as TNmorphNotificationPlacement[];

const getNotificationDuration = (notification: TNmorphNotificationItem) => {
  if (typeof notification.duration !== 'number' || !Number.isFinite(notification.duration)) return 0;
  return Math.max(notification.duration, 0);
};

const hasDurationIndicator = (notification: TNmorphNotificationItem) => getNotificationDuration(notification) > 0;

const hasDurationValue = (notification: TNmorphNotificationItem) => notification.showDurationValue !== false;

const getNotificationRemainingDuration = (notification: TNmorphNotificationItem) => {
  const duration = getNotificationDuration(notification);
  const startedAt = durationStartedAtById.get(notification.id);

  if (!duration || !startedAt) return duration;

  return Math.max(duration - (durationTick.value - startedAt), 0);
};

const formatNotificationDuration = (duration: number) => {
  if (duration < 1000) return `${Math.ceil(duration)}ms`;

  return `${Math.ceil(duration / 1000)}s`;
};

const getNotificationDurationLabel = (notification: TNmorphNotificationItem) =>
  formatNotificationDuration(getNotificationRemainingDuration(notification));

const getNotificationStyle = (notification: TNmorphNotificationItem): CSSProperties =>
  ({
    '--nmorph-private-notification-provider-duration': `${getNotificationDuration(notification)}ms`,
  }) as CSSProperties;

const clearDurationTimer = (id: string, keepStartedAt = false) => {
  const timer = durationTimers.get(id);
  if (timer) clearTimeout(timer);

  durationTimers.delete(id);
  durationById.delete(id);
  if (!keepStartedAt) durationStartedAtById.delete(id);
};

const removeRenderedNotification = (id: string) => {
  renderedNotifications.value = renderedNotifications.value.filter((notification) => notification.id !== id);
  closingIds.value = closingIds.value.filter((closingId) => closingId !== id);
  clearDurationTimer(id);
};

const closeHandler = (id: string, trackRemoval = true) => {
  if (closingIds.value.includes(id)) {
    return;
  }

  clearDurationTimer(id, true);

  if (trackRemoval && !removedIds.value.includes(id)) {
    removedIds.value = [...removedIds.value, id];
  }

  closingIds.value = [...closingIds.value, id];

  setTimeout(() => removeRenderedNotification(id), ANIMATION_DURATION);
};

const scheduleDurationTimer = (notification: TNmorphNotificationItem) => {
  const duration = getNotificationDuration(notification);

  if (durationById.get(notification.id) === duration) return;

  clearDurationTimer(notification.id);

  if (!duration) return;

  durationTick.value = Date.now();
  durationStartedAtById.set(notification.id, durationTick.value);
  durationTimers.set(
    notification.id,
    setTimeout(() => closeHandler(notification.id), duration)
  );
  durationById.set(notification.id, duration);
};

const props = withDefaults(defineProps<INmorphNotificationProviderProps>(), {
  placement: 'top-right',
  zIndex: undefined,
  quantity: 100,
  teleportTo: 'body',
  disabledTeleport: false,
});

const isMounted = ref(false);
const nmorph = inject<INmorphInstance | undefined>('nmorph');
const dynamicZIndex = ref(nmorph?.zIndex.current.value ?? 1000);
const activeZIndexAllocated = ref(false);

const allocateZIndex = () => {
  if (props.zIndex !== undefined || activeZIndexAllocated.value) return;

  dynamicZIndex.value = nmorph?.zIndex.next() ?? dynamicZIndex.value + 1;
  activeZIndexAllocated.value = true;
};

const notificationGroups = computed(() =>
  placementList.map((placement) => {
    const notifications = renderedNotifications.value.filter(
      (notification) => (notification.placement ?? props.placement) === placement
    );
    const start = Math.max(notifications.length - props.quantity, 0);

    return {
      placement,
      notifications: notifications.slice(start),
    };
  })
);

const hasRunningDurationIndicator = computed(() =>
  renderedNotifications.value.some(
    (notification) => hasDurationIndicator(notification) && !closingIds.value.includes(notification.id)
  )
);
const hasRenderedNotifications = computed(() => renderedNotifications.value.length > 0);
const hasActiveNotifications = computed(
  () =>
    hasRenderedNotifications.value ||
    props.notifications.some(
      (notification) => hasNotificationId(notification) && !removedIds.value.includes(notification.id)
    )
);
const zIndex = computed(() => props.zIndex ?? dynamicZIndex.value);
const teleportDisabled = computed(() => !isMounted.value || props.disabledTeleport);
const rootStyle = computed<CSSProperties>(() => ({ zIndex: zIndex.value }));
const rootAttrs = useMergedAttrs('nmorph-notification-provider', rootStyle);

const stopDurationTicker = () => {
  if (!durationTicker) return;

  clearInterval(durationTicker);
  durationTicker = undefined;
};

watch(
  () => props.notifications,
  () => {
    if (hasActiveNotifications.value) allocateZIndex();
  },
  { deep: true, immediate: true, flush: 'sync' }
);

watch(
  hasRenderedNotifications,
  (hasRendered) => {
    if (hasRendered) {
      allocateZIndex();
      return;
    }

    activeZIndexAllocated.value = false;
  },
  { immediate: true, flush: 'sync' }
);

watch(
  hasRunningDurationIndicator,
  (isRunning) => {
    if (!isRunning) {
      stopDurationTicker();
      return;
    }

    if (durationTicker) return;

    durationTick.value = Date.now();
    durationTicker = setInterval(() => {
      durationTick.value = Date.now();
    }, DURATION_TICK_INTERVAL);
  },
  { immediate: true }
);

watch(
  () => props.notifications,
  (notifications) => {
    const activeNotifications = notifications
      .filter(hasNotificationId)
      .filter((notification) => !removedIds.value.includes(notification.id));

    renderedNotifications.value = renderedNotifications.value.map((currentNotification) => {
      const nextNotification = activeNotifications.find((notification) => notification.id === currentNotification.id);
      return nextNotification ? { ...currentNotification, ...nextNotification } : currentNotification;
    });

    activeNotifications.forEach((notification) => {
      const isRendered = renderedNotifications.value.some(
        (currentNotification) => currentNotification.id === notification.id
      );

      if (!isRendered) {
        renderedNotifications.value = [...renderedNotifications.value, notification];
      }
    });

    activeNotifications.forEach((notification) => scheduleDurationTimer(notification));

    renderedNotifications.value
      .filter(
        (notification) => !activeNotifications.some((activeNotification) => activeNotification.id === notification.id)
      )
      .forEach((notification) => closeHandler(notification.id, false));
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  isMounted.value = true;
});

onBeforeUnmount(() => {
  durationTimers.forEach((timer) => clearTimeout(timer));
  durationTimers.clear();
  durationById.clear();
  durationStartedAtById.clear();
  stopDurationTicker();
});
</script>

<template>
  <Teleport :to="props.teleportTo" :disabled="teleportDisabled">
    <div v-bind="rootAttrs">
      <transition-group
        v-for="group in notificationGroups"
        :key="group.placement"
        appear
        name="nmorph-notification"
        tag="div"
        :class="`nmorph-notification-provider__list nmorph-notification-provider__list--${group.placement}`"
      >
        <div
          v-for="notification in group.notifications"
          :key="notification.id"
          :style="getNotificationStyle(notification)"
          :class="[
            'nmorph-notification-provider__notification',
            hasDurationIndicator(notification) && 'nmorph-notification-provider__notification--with-duration',
            closingIds.includes(notification.id) && 'nmorph-notification-provider__notification--closing',
          ]"
        >
          <NmorphAlert
            :id="notification.id"
            class="nmorph-notification-provider__alert"
            :style="{ width: notification.width }"
            :type="notification.type"
            :closable="notification.closable"
            :title="notification.title"
            :content="notification.content"
            :fill="notification.fill"
            :show-icon="notification.showIcon"
            :bordered="notification.bordered"
            :html="notification.html"
            :close-icon-position="notification.closeIconPosition"
            :background-color="notification.backgroundColor"
            @close="() => closeHandler(notification.id)"
          />
          <div
            v-if="hasDurationIndicator(notification)"
            :key="`${notification.id}-${getNotificationDuration(notification)}`"
            class="nmorph-notification-provider__duration"
            :title="hasDurationValue(notification) ? getNotificationDurationLabel(notification) : undefined"
            aria-hidden="true"
          >
            <span class="nmorph-notification-provider__duration-track">
              <span class="nmorph-notification-provider__duration-bar" />
            </span>
            <span v-if="hasDurationValue(notification)" class="nmorph-notification-provider__duration-value">
              {{ getNotificationDurationLabel(notification) }}
            </span>
          </div>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<style lang="scss">
.nmorph-notification-provider {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;

  .nmorph-notification-provider__notification {
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 1rem;
    overflow: hidden;
    border-radius: var(--default-border-radius);
    transition:
      transform 0.5s ease,
      opacity 0.5s ease-in-out;
    pointer-events: all;
  }

  .nmorph-notification-provider__notification--with-duration {
    .nmorph-alert {
      padding-bottom: calc(var(--indentation-03) + 12px);
    }
  }

  .nmorph-notification-provider__duration {
    position: absolute;
    right: var(--indentation-04);
    bottom: var(--indentation-02);
    left: var(--indentation-04);
    display: flex;
    gap: var(--indentation-02);
    align-items: center;
    color: var(--nmorph-white-color);
    pointer-events: none;
  }

  .nmorph-notification-provider__duration-track {
    flex: 1 1 auto;
    min-width: 20px;
    height: 3px;
    overflow: hidden;
    background: color-mix(in srgb, currentColor 20%, transparent);
    border-radius: 999px;
  }

  .nmorph-notification-provider__duration-bar {
    display: block;
    width: 100%;
    height: 100%;
    background: currentColor;
    border-radius: inherit;
    transform-origin: left center;
    opacity: 0.72;
    animation: nmorph-notification-provider-duration var(--nmorph-private-notification-provider-duration) linear
      forwards;
  }

  .nmorph-notification-provider__duration-value {
    flex: 0 0 auto;
    color: currentColor;
    font-size: var(--nmorph-typography-caption-font-size);
    line-height: 1;
    opacity: 0.72;
  }

  .nmorph-notification-provider__list {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 100vw;
    pointer-events: none;
  }

  .nmorph-notification-move {
    transition: transform 0.5s ease;
  }

  .nmorph-notification-provider__list--top-left {
    top: 0;
    left: 0;
    align-items: flex-start;
  }

  .nmorph-notification-provider__list--top-right {
    top: 0;
    right: 0;
    align-items: flex-end;
  }

  .nmorph-notification-provider__list--bottom-left {
    bottom: 0;
    left: 0;
    align-items: flex-start;
  }

  .nmorph-notification-provider__list--bottom-right {
    right: 0;
    bottom: 0;
    align-items: flex-end;
  }

  .nmorph-notification-provider__list--top-center {
    top: 0;
    left: 50%;
    align-items: center;
    transform: translateX(-50%);
  }

  .nmorph-notification-provider__list--bottom-center {
    bottom: 0;
    left: 50%;
    align-items: center;
    transform: translateX(-50%);
  }

  .nmorph-notification-provider__list--top-left .nmorph-notification-enter-active,
  .nmorph-notification-provider__list--bottom-left .nmorph-notification-enter-active,
  .nmorph-notification-provider__list--top-right .nmorph-notification-enter-active,
  .nmorph-notification-provider__list--bottom-right .nmorph-notification-enter-active,
  .nmorph-notification-provider__list--top-center .nmorph-notification-enter-active,
  .nmorph-notification-provider__list--bottom-center .nmorph-notification-enter-active,
  .nmorph-notification-provider__list--top-left .nmorph-notification-leave-active,
  .nmorph-notification-provider__list--bottom-left .nmorph-notification-leave-active,
  .nmorph-notification-provider__list--top-right .nmorph-notification-leave-active,
  .nmorph-notification-provider__list--bottom-right .nmorph-notification-leave-active,
  .nmorph-notification-provider__list--top-center .nmorph-notification-leave-active,
  .nmorph-notification-provider__list--bottom-center .nmorph-notification-leave-active {
    transition:
      transform 0.5s ease,
      opacity 0.5s ease-in-out;
  }

  .nmorph-notification-provider__list--top-left .nmorph-notification-enter-from,
  .nmorph-notification-provider__list--bottom-left .nmorph-notification-enter-from {
    transform: translateX(-100%);
  }

  .nmorph-notification-provider__list--top-right .nmorph-notification-enter-from,
  .nmorph-notification-provider__list--bottom-right .nmorph-notification-enter-from {
    transform: translateX(100%);
  }

  .nmorph-notification-provider__list--top-center .nmorph-notification-enter-from {
    transform: translateY(-100%);
  }

  .nmorph-notification-provider__list--bottom-center .nmorph-notification-enter-from {
    transform: translateY(100%);
  }

  .nmorph-notification-provider__list--top-left .nmorph-notification-leave-to,
  .nmorph-notification-provider__list--bottom-left .nmorph-notification-leave-to {
    transform: translateX(-100%);
  }

  .nmorph-notification-provider__list--top-right .nmorph-notification-leave-to,
  .nmorph-notification-provider__list--bottom-right .nmorph-notification-leave-to {
    transform: translateX(100%);
  }

  .nmorph-notification-provider__list--top-center .nmorph-notification-leave-to {
    transform: translateY(-100%);
  }

  .nmorph-notification-provider__list--bottom-center .nmorph-notification-leave-to {
    transform: translateY(100%);
  }

  .nmorph-notification-enter-from {
    opacity: 0;
  }

  .nmorph-notification-enter-to {
    transform: translate(0);
    opacity: 1;
  }

  .nmorph-notification-leave-active {
    overflow: hidden;

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-text-color);

      display: flex;
      align-items: center;
      width: var(--nmorph-private-icon-width);
      min-width: var(--nmorph-private-icon-width);
      height: var(--nmorph-private-icon-height);
      min-height: var(--nmorph-private-icon-height);
    }

    .nmorph-icon--small {
      --nmorph-private-icon-width: 14px;
      --nmorph-private-icon-height: 14px;
    }

    .nmorph-icon--medium {
      --nmorph-private-icon-width: 20px;
      --nmorph-private-icon-height: 20px;
    }

    .nmorph-icon--large {
      --nmorph-private-icon-width: 32px;
      --nmorph-private-icon-height: 32px;
    }

    .nmorph-icon__content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--nmorph-private-icon-width);
      min-width: var(--nmorph-private-icon-width);
      height: var(--nmorph-private-icon-height);
      min-height: var(--nmorph-private-icon-height);
      overflow: hidden;
    }

    .nmorph-alert__close .nmorph-icon,
    .nmorph-alert__content,
    .nmorph-alert__content-title {
      --nmorph-private-icon-color: var(--nmorph-white-color);
    }

    .nmorph-alert--success .nmorph-alert__icon .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-success-color);
    }

    .nmorph-alert--error .nmorph-alert__icon .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-error-color);
    }

    .nmorph-alert--warning .nmorph-alert__icon .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-warn-color);
    }

    .nmorph-alert--info .nmorph-alert__icon .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-info-color);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: var(--nmorph-private-icon-color);
      stroke-width: 0;
    }

    path {
      stroke: var(--nmorph-private-icon-color);
    }
  }

  .nmorph-notification-leave-to {
    opacity: 0;
    pointer-events: none;
  }

  .nmorph-notification-provider__list--top-left .nmorph-notification-provider__notification--closing,
  .nmorph-notification-provider__list--bottom-left .nmorph-notification-provider__notification--closing {
    position: absolute;
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
  }

  .nmorph-notification-provider__list--top-right .nmorph-notification-provider__notification--closing,
  .nmorph-notification-provider__list--bottom-right .nmorph-notification-provider__notification--closing {
    position: absolute;
    transform: translateX(100%);
    opacity: 0;
    pointer-events: none;
  }

  .nmorph-notification-provider__list--top-center .nmorph-notification-provider__notification--closing {
    position: absolute;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }

  .nmorph-notification-provider__list--bottom-center .nmorph-notification-provider__notification--closing {
    position: absolute;
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
  }
}

@keyframes nmorph-notification-provider-duration {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}
</style>
