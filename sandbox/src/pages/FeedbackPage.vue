<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphAlert,
  NmorphDialog,
  NmorphTooltip,
  NmorphButton,
  NmorphNotificationProvider,
  useNmorphNotification,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const dialogOpen = ref(false)
const notificationProvider = useNmorphNotification()

const showSuccessNotification = () => {
  notificationProvider.notify({
    type: 'success',
    title: 'Success',
    content: 'Close this notification to check the animation',
    closable: true,
    width: '320px',
  })
}

const showInfoNotification = () => {
  notificationProvider.notify({
    type: 'info',
    title: 'Info',
    content: String(Date.now()),
    closable: true,
    width: '320px',
  })
}
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphAlert">
      <div class="stack">
        <div class="col">
          <NmorphAlert type="info" title="Info" content="This is an info alert" />
          <NmorphAlert type="success" title="Success" content="This is a success alert" />
          <NmorphAlert type="warning" title="Warning" content="This is a warning alert" />
          <NmorphAlert type="error" title="Error" content="This is an error alert" />
        </div>
        <div class="actions">
          <NmorphButton text="Show success notification" @click="showSuccessNotification" />
          <NmorphButton text="Show info notification" style-type="transparent" @click="showInfoNotification" />
        </div>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphDialog">
      <NmorphButton text="Open dialog" @click="dialogOpen = true" />
      <NmorphDialog v-model="dialogOpen" title="Dialog title">
        <p>Dialog content goes here.</p>
      </NmorphDialog>
    </SandboxSection>

    <SandboxSection title="NmorphTooltip">
      <NmorphTooltip content="Hello from tooltip">
        <NmorphButton text="Hover me" />
      </NmorphTooltip>
    </SandboxSection>
  </div>
  <NmorphNotificationProvider
    :notifications="notificationProvider.notifications.value"
    placement="top-right"
  />

</template>

<style scoped>
.page { display: grid; gap: 24px; }
.col { display: grid; gap: 8px; }
.stack { display: grid; gap: 16px; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
</style>
