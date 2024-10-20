<script setup lang="ts">
import { INmorphNotification, NmorphNotificationPlacement } from '@/components/providers';
import { NmorphAlert } from '@/components';
import { computed, ref } from 'vue';

const removedIds = ref<string[]>([]);

const notificationElements = computed(() => props.notifications.filter((el) => !removedIds.value.includes(el.id)));

const visibleNotifications = computed(() => {
  const start = Math.max(notificationElements.value.length - props.quantity, 0);
  return notificationElements.value.slice(start);
});

const closeHandler = (id: string) => {
  removedIds.value = [...removedIds.value, id];
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

const zIndex = computed(() => props.zIndex);
</script>

<template>
  <div :class="`nmorph-notification-provider nmorph-notification-provider--${props.placement}`" :style="{ zIndex }">
    <transition-group name="nmorph-notification" tag="div">
      <div
        v-for="notification in visibleNotifications"
        :key="notification.id"
        :style="{ width: notification.width }"
        class="nmorph-notification-provider__notification"
      >
        <NmorphAlert v-bind="notification" @close="() => closeHandler(notification.id)" />
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.nmorph-notification-enter-from,
.nmorph-notification-leave-to {
  opacity: 0;
}

.nmorph-notification-enter-to,
.nmorph-notification-leave-from {
  opacity: 1;
}

@mixin animation-right {
  .nmorph-notification-enter-active,
  .nmorph-notification-leave-active {
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

  .nmorph-notification-leave-from {
    transform: translateX(0);
  }

  .nmorph-notification-leave-to {
    transform: translateX(100%);
  }
}

@mixin animation-left {
  .nmorph-notification-enter-active,
  .nmorph-notification-leave-active {
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

  .nmorph-notification-leave-from {
    transform: translateX(0);
  }

  .nmorph-notification-leave-to {
    transform: translateX(-100%);
  }
}

@mixin animation-top-center {
  .nmorph-notification-enter-active,
  .nmorph-notification-leave-active {
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

  .nmorph-notification-leave-from {
    transform: translateY(0);
  }

  .nmorph-notification-leave-to {
    transform: translateY(-100%);
  }
}

@mixin animation-bottom-center {
  .nmorph-notification-enter-active,
  .nmorph-notification-leave-active {
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

  .nmorph-notification-leave-from {
    transform: translateY(0);
  }

  .nmorph-notification-leave-to {
    transform: translateY(100%);
  }
}

.nmorph-notification-provider {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.nmorph-notification-provider__notification {
  width: fit-content;
  height: fit-content;
  margin: 1rem;
  pointer-events: all;
}

.nmorph-notification-provider--top-left {
  align-items: flex-start;

  @include animation-left;
}

.nmorph-notification-provider--top-right {
  align-items: flex-end;

  @include animation-right;
}

.nmorph-notification-provider--bottom-left {
  bottom: 0;
  justify-content: flex-end;

  @include animation-left;
}

.nmorph-notification-provider--bottom-right {
  bottom: 0;
  align-items: flex-end;
  justify-content: flex-end;

  @include animation-right;
}

.nmorph-notification-provider--top-center {
  align-items: center;
  justify-content: flex-start;

  @include animation-top-center;
}

.nmorph-notification-provider--bottom-center {
  align-items: center;
  justify-content: flex-end;

  @include animation-bottom-center;
}
</style>
