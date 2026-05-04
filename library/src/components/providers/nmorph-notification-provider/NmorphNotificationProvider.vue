<script setup lang="ts">
import { INmorphNotification, NmorphNotificationPlacement } from '@/components/providers';
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

const removeRenderedNotification = (id: string) => {
  renderedNotifications.value = renderedNotifications.value.filter((notification) => notification.id !== id);
  closingIds.value = closingIds.value.filter((closingId) => closingId !== id);
};

const visibleNotifications = computed<TNmorphNotificationItem[]>(() => {
  const start = Math.max(renderedNotifications.value.length - props.quantity, 0);
  return renderedNotifications.value.slice(start);
});

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
  placement?: keyof typeof NmorphNotificationPlacement;
  zIndex?: number;
  quantity?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  placement: 'top-right',
  zIndex: 1000,
  quantity: 100,
});

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
  display: flex;
  flex-direction: column;
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
    position: relative;
  }

  .nmorph-notification-move {
    transition: transform 0.5s ease;
  }

  &.nmorph-notification-provider--top-left {
    align-items: flex-start;

    .nmorph-notification-enter-active {
      transition:
        transform 0.5s ease,
        opacity 0.5s ease-in-out;
    }

    .nmorph-notification-enter-from {
      transform: translateX(-100%);
    }

    .nmorph-notification-enter-to {
      transform: translateX(0);
    }

    .nmorph-notification-provider__notification--closing {
      position: absolute;
      transform: translateX(-100%);
      opacity: 0;
      pointer-events: none;
    }
  }

  &.nmorph-notification-provider--top-right {
    align-items: flex-end;

    .nmorph-notification-enter-active {
      transition:
        transform 0.5s ease,
        opacity 0.5s ease-in-out;
    }

    .nmorph-notification-enter-from {
      transform: translateX(100%);
    }

    .nmorph-notification-enter-to {
      transform: translateX(0);
    }

    .nmorph-notification-provider__notification--closing {
      position: absolute;
      transform: translateX(100%);
      opacity: 0;
      pointer-events: none;
    }
  }

  &.nmorph-notification-provider--bottom-left {
    bottom: 0;
    justify-content: flex-end;

    .nmorph-notification-enter-active {
      transition:
        transform 0.5s ease,
        opacity 0.5s ease-in-out;
    }

    .nmorph-notification-enter-from {
      transform: translateX(-100%);
    }

    .nmorph-notification-enter-to {
      transform: translateX(0);
    }

    .nmorph-notification-provider__notification--closing {
      position: absolute;
      transform: translateX(-100%);
      opacity: 0;
      pointer-events: none;
    }
  }

  &.nmorph-notification-provider--bottom-right {
    bottom: 0;
    align-items: flex-end;
    justify-content: flex-end;

    .nmorph-notification-enter-active {
      transition:
        transform 0.5s ease,
        opacity 0.5s ease-in-out;
    }

    .nmorph-notification-enter-from {
      transform: translateX(100%);
    }

    .nmorph-notification-enter-to {
      transform: translateX(0);
    }

    .nmorph-notification-provider__notification--closing {
      position: absolute;
      transform: translateX(100%);
      opacity: 0;
      pointer-events: none;
    }
  }

  &.nmorph-notification-provider--top-center {
    align-items: center;
    justify-content: flex-start;

    .nmorph-notification-enter-active {
      transition:
        transform 0.5s ease,
        opacity 0.5s ease-in-out;
    }

    .nmorph-notification-enter-from {
      transform: translateY(-100%);
    }

    .nmorph-notification-enter-to {
      transform: translateY(0);
    }

    .nmorph-notification-provider__notification--closing {
      position: absolute;
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
    }
  }

  &.nmorph-notification-provider--bottom-center {
    align-items: center;
    justify-content: flex-end;

    .nmorph-notification-enter-active {
      transition:
        transform 0.5s ease,
        opacity 0.5s ease-in-out;
    }

    .nmorph-notification-enter-from {
      transform: translateY(100%);
    }

    .nmorph-notification-enter-to {
      transform: translateY(0);
    }

    .nmorph-notification-provider__notification--closing {
      position: absolute;
      transform: translateY(100%);
      opacity: 0;
      pointer-events: none;
    }
  }

  .nmorph-notification-enter-from {
    opacity: 0;
  }

  .nmorph-notification-enter-to {
    opacity: 1;
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent
    :class="`nmorph-notification-provider nmorph-notification-provider--${props.placement}`"
    :style="{ zIndex }"
  >
    <transition-group name="nmorph-notification" tag="div" class="nmorph-notification-provider__list">
      <NmorphAlert
        v-for="notification in visibleNotifications"
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
