<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphAlert,
  NmorphButton,
  NmorphCallout,
  NmorphDialog,
  NmorphIcon,
  NmorphIconBell,
  NmorphIconCheck,
  NmorphNotificationProvider,
  NmorphNotificationPlacement,
  NmorphTooltip,
  useNmorphNotification,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const notificationPlacements = Object.values(NmorphNotificationPlacement)

const dialogOpen = ref(false)
const customDialogOpen = ref(false)
const tallDialogOpen = ref(false)
const closableAlertVisible = ref(true)
const notificationProvider = useNmorphNotification()
const tallDialogItems = Array.from({ length: 16 }, (_, index) => `Dynamic row ${index + 1}`)

const showNotification = (type: 'success' | 'info' | 'warning' | 'error') => {
  notificationProvider.notify({
    type,
    title: `${type[0].toUpperCase()}${type.slice(1)}`,
    content: `Notification created at ${new Date().toLocaleTimeString()}`,
    closable: true,
    width: '320px',
    duration: 4000,
  })
}

const showPlacementNotification = (placement: keyof typeof NmorphNotificationPlacement) => {
  notificationProvider.notify({
    placement,
    type: 'info',
    title: placement,
    content: `Placed at ${new Date().toLocaleTimeString()}`,
    closable: true,
    width: '320px',
    duration: 4000,
  })
}

const showStickyNotification = () => {
  notificationProvider.notify({
    type: 'info',
    title: 'Sticky',
    content: 'Duration is disabled for this one.',
    closable: true,
    width: '320px',
    duration: 0,
  })
}
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphAlert">
      <div class="stack">
        <NmorphAlert type="info" title="Info" content="This is an info alert" />
        <NmorphAlert type="success" title="Success" content="This is a success alert" fill />
        <NmorphAlert type="warning" title="Warning" content="No border and no icon" :bordered="false" :show-icon="false" />
        <NmorphAlert type="error" title="Error" close-icon-position="flex-start" closable @close="closableAlertVisible = false">
          Closable alert slot content.
        </NmorphAlert>
        <NmorphAlert v-if="closableAlertVisible" type="success" title="Visible" content="Close the error alert to hide state." />
        <NmorphAlert :html="'<strong>HTML</strong> alert content'" />
        <NmorphAlert type="info" title="Custom icon">
          <template #icon>
            <NmorphIcon color="var(--nmorph-success-color)">
              <NmorphIconCheck />
            </NmorphIcon>
          </template>
          Icon slot with default content slot.
        </NmorphAlert>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphCallout">
      <div class="stack">
        <NmorphCallout content="Useful content without a title." />
        <NmorphCallout title="Information" content="Useful content for this section." />
        <NmorphCallout type="warning" title="Attention" content="Important content for this section." />
        <NmorphCallout type="success" title="Success" content="Successful content for this section." />
        <NmorphCallout type="error" title="Error" content="Error content for this section." />
        <NmorphCallout
          type="success"
          title="Custom sizes"
          content="Padding, radius, accent strip and text sizes are controlled by props."
          padding="var(--indentation-04)"
          border-radius="var(--border-radius-80)"
          accent-width="var(--indentation-02)"
          title-gap="var(--indentation-02)"
          title-font-size="var(--font-size-large)"
          content-font-size="var(--font-size-base)"
        />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphDialog">
      <div class="row">
        <NmorphButton text="Open dialog" @click="dialogOpen = true" />
        <NmorphButton text="Custom header" style-type="transparent" @click="customDialogOpen = true" />
        <NmorphButton text="Tall content" style-type="transparent" @click="tallDialogOpen = true" />
      </div>
      <NmorphDialog v-model="dialogOpen" title="Dialog title" width="380px" :close-delay="120" :z-index="1100">
        <p>Dialog content goes here.</p>
      </NmorphDialog>
      <NmorphDialog
        v-model="customDialogOpen"
        width="460px"
        :open-delay="100"
        :show-close="false"
        :close-on-overlay="false"
      >
        <template #header>
          <div class="dialog-header">
            <span>Custom header slot</span>
            <NmorphButton text="Close" height="thin" @click="customDialogOpen = false" />
          </div>
        </template>
        <p>Overlay click is disabled for this dialog.</p>
      </NmorphDialog>
      <NmorphDialog v-model="tallDialogOpen" title="Scrollable content" width="420px" max-height="260px">
        <div class="dialog-scroll-list">
          <p v-for="item in tallDialogItems" :key="item">{{ item }}</p>
        </div>
      </NmorphDialog>
    </SandboxSection>

    <SandboxSection title="NmorphTooltip">
      <div class="row tooltip-row">
        <NmorphTooltip text="Top tooltip" position="top">
          <NmorphButton text="Top" />
        </NmorphTooltip>
        <NmorphTooltip text="Right tooltip" position="right">
          <NmorphButton text="Right" />
        </NmorphTooltip>
        <NmorphTooltip text="Bottom tooltip" position="bottom">
          <NmorphButton text="Bottom" />
        </NmorphTooltip>
        <NmorphTooltip text="Left tooltip" position="left">
          <NmorphButton text="Left" />
        </NmorphTooltip>
        <NmorphTooltip force-show text="Forced" :force-coordinate="{ x: '0', y: '34px' }">
          <NmorphButton text="Force show" style-type="transparent" />
        </NmorphTooltip>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphNotificationProvider">
      <div class="row">
        <NmorphButton text="Success" @click="showNotification('success')" />
        <NmorphButton text="Info" style-type="transparent" @click="showNotification('info')">
          <template #icon>
            <NmorphIconBell />
          </template>
        </NmorphButton>
        <NmorphButton text="Warning" @click="showNotification('warning')" />
        <NmorphButton text="Error" @click="showNotification('error')" />
        <NmorphButton text="Sticky" style-type="transparent" @click="showStickyNotification" />
      </div>
      <div class="row">
        <NmorphButton
          v-for="placement in notificationPlacements"
          :key="placement"
          :text="placement"
          style-type="transparent"
          @click="showPlacementNotification(placement)"
        />
      </div>
    </SandboxSection>
  </div>
  <NmorphNotificationProvider
    :notifications="notificationProvider.notifications.value"
    placement="top-right"
    :quantity="3"
    :z-index="1200"
  />
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.stack {
  display: grid;
  gap: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.tooltip-row {
  min-height: 120px;
  align-items: center;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.dialog-scroll-list {
  display: grid;
  gap: 8px;
}

p {
  margin: 0;
}
</style>
