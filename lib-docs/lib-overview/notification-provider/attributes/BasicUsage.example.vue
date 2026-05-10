<script setup lang="ts">
import {
  NmorphNotificationProvider,
  type INmorphNotification,
  NmorphAlertType,
  NmorphButton,
} from "@nmorph/nmorph-ui-kit";

const initAlert = {
  type: NmorphAlertType.success,
  closable: true,
  content: "Lorem ipsum",
  width: "150px",
};

const notifications = ref<INmorphNotification[]>([]);

const addNotification = (
  placement: INmorphNotification["placement"] = "top-right",
) => {
  notifications.value.push({
    ...initAlert,
    id: String(Date.now()),
    placement,
    type:
      placement === "top-center"
        ? NmorphAlertType.info
        : NmorphAlertType.success,
  });
};
</script>

<template>
  <div class="notification-provider-basic-usage-overview">
    <ClientOnly>
      <div class="actions">
        <div class="actions__button">
          <NmorphButton
            text="Add action notification"
            @click="() => addNotification('top-right')"
          />
        </div>
        <div class="actions__button">
          <NmorphButton
            text="Add info notification"
            @click="() => addNotification('top-center')"
          />
        </div>
      </div>
      <NmorphNotificationProvider
        :notifications="notifications"
        placement="top-right"
        :quantity="3"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.notification-provider-basic-usage-overview {
  .actions {
    display: flex;
  }

  .actions__button {
    margin-right: 8px;
  }
}
</style>
