<script setup lang="ts">
import {
  NmorphNotificationProvider,
  type INmorphNotification,
  NmorphAlertType,
  NmorphButton,
} from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const initAlert = {
    type: NmorphAlertType.success,
    closable: true,
    content: "Lorem ipsum",
    width: "150px",
  };

  const notifications = ref<INmorphNotification[]>([]);

  const addNotification = (
    placement: INmorphNotification["placement"] = "top-right"
  ) => {
    notifications.value.push({
      ...initAlert,
      id: String(Date.now()),
      placement,
      type: placement === "top-center" ? NmorphAlertType.info : NmorphAlertType.success,
    });
  };
<\/script>
`;

const templateData = `
<template>
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
</template>
`;

const cssData = `
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
`;

const code = [scriptData, templateData, cssData];

const initAlert = {
  type: NmorphAlertType.success,
  closable: true,
  content: "Lorem ipsum",
  width: "150px",
};

const notifications = ref<INmorphNotification[]>([]);

const addNotification = (placement: INmorphNotification["placement"] = "top-right") => {
  notifications.value.push({
    ...initAlert,
    id: String(Date.now()),
    placement,
    type: placement === "top-center" ? NmorphAlertType.info : NmorphAlertType.success,
  });
};
</script>

<template>
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="notification-provider-basic-usage-overview">
          <ClientOnly>
            <div class="actions">
              <div class="actions__button">
                <NmorphButton text="Add action notification" @click="() => addNotification('top-right')" />
              </div>
              <div class="actions__button">
                <NmorphButton text="Add info notification" @click="() => addNotification('top-center')" />
              </div>
            </div>
            <NmorphNotificationProvider :notifications="notifications" placement="top-right" :quantity="3" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
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
