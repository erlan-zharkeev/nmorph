<script setup lang="ts">
import { NmorphNotificationPlacement } from '@/components/providers';
import type { INmorphNotification, TNmorphNotificationPlacement } from '@/components/providers';
import { NmorphAlert } from '@/components';
import { computed, ref, watch } from 'vue';
import { styled, css } from '@vue-styled-components/core';

const ANIMATION_DURATION = 500;

type TNmorphNotificationItem = INmorphNotification & {
  id: string;
};

const hasNotificationId = (notification: INmorphNotification): notification is TNmorphNotificationItem =>
  typeof notification.id === 'string' && notification.id.length > 0;

const removedIds = ref<string[]>([]);
const closingIds = ref<string[]>([]);
const renderedNotifications = ref<TNmorphNotificationItem[]>([]);
const placementList = Object.values(NmorphNotificationPlacement) as TNmorphNotificationPlacement[];

const removeRenderedNotification = (id: string) => {
  renderedNotifications.value = renderedNotifications.value.filter((notification) => notification.id !== id);
  closingIds.value = closingIds.value.filter((closingId) => closingId !== id);
};

const closeHandler = (id: string, trackRemoval = true) => {
  if (closingIds.value.includes(id)) {
    return;
  }

  if (trackRemoval && !removedIds.value.includes(id)) {
    removedIds.value = [...removedIds.value, id];
  }

  closingIds.value = [...closingIds.value, id];

  setTimeout(() => removeRenderedNotification(id), ANIMATION_DURATION);
};

interface INmorphProps {
  notifications: INmorphNotification[];
  placement?: TNmorphNotificationPlacement;
  zIndex?: number;
  quantity?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  placement: 'top-right',
  zIndex: 1000,
  quantity: 100,
});

const notificationGroups = computed(() =>
  placementList
    .map((placement) => {
      const notifications = renderedNotifications.value.filter(
        (notification) => (notification.placement ?? props.placement) === placement
      );
      const start = Math.max(notifications.length - props.quantity, 0);

      return {
        placement,
        notifications: notifications.slice(start),
      };
    })
    .filter((group) => group.notifications.length > 0)
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
        renderedNotifications.value.push(notification);
      }
    });

    renderedNotifications.value
      .filter(
        (notification) => !activeNotifications.some((activeNotification) => activeNotification.id === notification.id)
      )
      .forEach((notification) => closeHandler(notification.id, false));
  },
  { deep: true, immediate: true }
);

const zIndex = computed(() => props.zIndex);

const commonCSS = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;

  .nmorph-notification-provider__notification {
    width: fit-content;
    height: fit-content;
    margin: 1rem;
    pointer-events: all;
    transition:
      transform 0.5s ease,
      opacity 0.5s ease-in-out;
  }

  .nmorph-notification-provider__list {
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 100vw;
    position: fixed;
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
      --color: var(--nmorph-text-color);

      display: flex;
      align-items: center;
      width: var(--width);
      min-width: var(--width);
      height: var(--height);
      min-height: var(--height);
    }

    .nmorph-icon--small {
      --width: 14px;
      --height: 14px;
    }

    .nmorph-icon--medium {
      --width: 20px;
      --height: 20px;
    }

    .nmorph-icon--large {
      --width: 32px;
      --height: 32px;
    }

    .nmorph-icon__content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--width);
      min-width: var(--width);
      height: var(--height);
      min-height: var(--height);
      overflow: hidden;
    }

    .nmorph-alert__close .nmorph-icon,
    .nmorph-alert__content,
    .nmorph-alert__content-title {
      --color: var(--nmorph-white-color);
    }

    &.nmorph-alert--success .nmorph-alert__icon .nmorph-icon {
      --color: var(--nmorph-success-color);
    }

    &.nmorph-alert--error .nmorph-alert__icon .nmorph-icon {
      --color: var(--nmorph-error-color);
    }

    &.nmorph-alert--warning .nmorph-alert__icon .nmorph-icon {
      --color: var(--nmorph-warn-color);
    }

    &.nmorph-alert--info .nmorph-alert__icon .nmorph-icon {
      --color: var(--nmorph-info-color);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: var(--color);
      stroke-width: 0;
    }

    path {
      stroke: var(--color);
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
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent class="nmorph-notification-provider" :style="{ zIndex }">
    <transition-group
      v-for="group in notificationGroups"
      :key="group.placement"
      name="nmorph-notification"
      tag="div"
      :class="`nmorph-notification-provider__list nmorph-notification-provider__list--${group.placement}`"
    >
      <NmorphAlert
        v-for="notification in group.notifications"
        :key="notification.id"
        :style="{ width: notification.width }"
        :class="[
          'nmorph-notification-provider__notification',
          closingIds.includes(notification.id) && 'nmorph-notification-provider__notification--closing',
        ]"
        v-bind="notification"
        @close="() => closeHandler(notification.id)"
      />
    </transition-group>
  </StyledComponent>
</template>
