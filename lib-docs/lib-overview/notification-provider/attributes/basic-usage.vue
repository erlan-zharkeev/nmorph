<script setup lang="ts">
import {
  NmorphNotificationProvider,
  type INmorphNotification,
  NmorphAlertType,
  NmorphButton,
} from "@nmorph/nmorph-ui-kit";

const scriptData = `
<style lang="ts" setup>
  const initAlert = {
    type: NmorphAlertType.success,
    closable: true,
    content: "Lorem ipsum",
    width: "300px",
  };

  const notificationsTopRight = ref<INmorphNotification[]>([]);
  const notificationsTopCenter = ref([]);

  const addNotification = (info: boolean = false) => {
    let notifications = notificationsTopRight;

    const notification = { ...initAlert, id: String(Date.now()) };
    if (info) {
      notifications = notificationsTopCenter;
      notification.type = NmorphAlertType.info;
    }
    notifications.value.push(notification);
  };
<\/style>
`;

const templateData = `
<template>
  <div class="actions">
    <div class="actions__button">
      <NmorphButton
        text="Add action notification"
        @click="() => addNotification()"
      />
    </div>
    <div class="actions__button">
      <NmorphButton
        text="Add info notification"
        @click="() => addNotification(true)"
      />
    </div>
  </div>
  <NmorphNotificationProvider
    :notifications="notificationsTopRight"
  />
  <NmorphNotificationProvider
    :notifications="notificationsTopCenter"
    placement="top-center"
    :quantity="1"
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
  width: "300px",
};

const notificationsTopRight = ref<INmorphNotification[]>([]);
const notificationsTopCenter = ref([]);

const addNotification = (info: boolean = false) => {
  let notifications = notificationsTopRight;

  const notification = { ...initAlert, id: String(Date.now()) };
  if (info) {
    notifications = notificationsTopCenter;
    notification.type = NmorphAlertType.info;
  }
  notifications.value.push(notification);
};
</script>

<template>
  <div id="content-basic-usage">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="notification-provider-basic-usage-overview">
          <ClientOnly>
            <div class="actions">
              <div class="actions__button">
                <NmorphButton
                  text="Add action notification"
                  @click="() => addNotification()"
                />
              </div>
              <div class="actions__button">
                <NmorphButton
                  text="Add info notification"
                  @click="() => addNotification(true)"
                />
              </div>
            </div>
            <NmorphNotificationProvider
              :notifications="notificationsTopRight"
            />
            <NmorphNotificationProvider
              :notifications="notificationsTopCenter"
              placement="top-center"
              :quantity="1"
            />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
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
