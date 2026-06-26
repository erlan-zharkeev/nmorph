<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphAlert,
  NmorphButton,
  NmorphCallout,
  NmorphDialog,
  NmorphDrawer,
  NmorphGuide,
  NmorphGuideStep,
  NmorphIcon,
  NmorphIconBell,
  NmorphIconCheck,
  NmorphNotificationProvider,
  NmorphNotificationPlacement,
  NmorphSpace,
  NmorphTooltip,
  type INmorphGuideStepItem,
  useNmorphNotification,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const notificationPlacements = Object.values(NmorphNotificationPlacement)
const guideOutlineColors = ['success', 'accent', 'warning', 'error'] as const
const guideOutlineOffsets = [0, 4, 8, 12]

const dialogOpen = ref(false)
const customDialogOpen = ref(false)
const tallDialogOpen = ref(false)
const docsDrawerOpen = ref(false)
const drawerOpen = ref(false)
const leftDrawerOpen = ref(false)
const closableAlertVisible = ref(true)
const guideOpen = ref(false)
const guideOutlineColor = ref<(typeof guideOutlineColors)[number]>('success')
const guideOutlineOffset = ref(4)
const notificationProvider = useNmorphNotification()
const tallDialogItems = Array.from({ length: 16 }, (_, index) => `Dynamic row ${index + 1}`)
const guideSteps = [
  {
    name: 'guide-action',
    title: 'Guide action',
    text: 'The target outline follows the selected color and offset.',
    position: 'bottom',
  },
  {
    name: 'guide-review',
    title: 'Review target',
    text: 'Change the controls and restart the guide to compare the highlight.',
    position: 'top',
  },
] satisfies INmorphGuideStepItem[]

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
        <NmorphAlert type="warning" title="Warning" content="No border and no icon" :bordered="false" />
        <NmorphAlert type="error" title="Error" close-icon-position="flex-start" closable @close="closableAlertVisible = false">
          Closable alert slot content.
        </NmorphAlert>
        <NmorphAlert v-if="closableAlertVisible" type="success" title="Visible" content="Close the error alert to hide state." />
        <NmorphAlert :html="'<strong>HTML</strong> alert content'" />
        <NmorphAlert type="info" title="Custom icon">
          <template #icon>
            <NmorphIcon color="var(--nmorph-success-text-color)">
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
        <NmorphCallout title="Information" content="Useful content for this section." type="info" />
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
        <NmorphButton text="Custom header" design="plain" @click="customDialogOpen = true" />
        <NmorphButton text="Tall content" design="plain" @click="tallDialogOpen = true" />
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
            <NmorphButton text="Close" thickness="thin" @click="customDialogOpen = false" />
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

    <SandboxSection title="NmorphDrawer">
      <div class="row">
        <NmorphButton text="Open drawer" @click="docsDrawerOpen = true" />
        <NmorphButton text="Right drawer" @click="drawerOpen = true" />
        <NmorphButton text="Left drawer" design="plain" @click="leftDrawerOpen = true" />
      </div>
      <NmorphDrawer v-model="docsDrawerOpen" title="Drawer" size="340px">
        <NmorphSpace direction="column" size="large">
          <p>
            Use a drawer for secondary flows that should not replace the current page.
          </p>
          <NmorphButton text="Close" @click="docsDrawerOpen = false" />
        </NmorphSpace>
      </NmorphDrawer>
      <NmorphDrawer v-model="drawerOpen" title="Drawer title" size="360px">
        <div class="drawer-content">
          <p>Drawer keeps the page context while showing a secondary flow.</p>
          <NmorphButton text="Done" @click="drawerOpen = false" />
        </div>
        <template #footer>
          <span class="hint">Footer slot</span>
        </template>
      </NmorphDrawer>
      <NmorphDrawer v-model="leftDrawerOpen" title="Left drawer" placement="left" :size="300">
        <div class="drawer-content">
          <p>This one opens from the left side.</p>
          <NmorphButton text="Close" thickness="thin" @click="leftDrawerOpen = false" />
        </div>
      </NmorphDrawer>
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
          <NmorphButton text="Force show" design="plain" />
        </NmorphTooltip>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphGuide">
      <div class="stack">
        <div class="row">
          <NmorphButton text="Start guide" @click="guideOpen = true" />
          <NmorphButton
            v-for="color in guideOutlineColors"
            :key="color"
            :text="color"
            :design="guideOutlineColor === color ? 'nmorph' : 'plain'"
            thickness="thin"
            @click="guideOutlineColor = color"
          />
          <NmorphButton
            v-for="offset in guideOutlineOffsets"
            :key="offset"
            :text="`${offset}px`"
            :design="guideOutlineOffset === offset ? 'nmorph' : 'plain'"
            thickness="thin"
            @click="guideOutlineOffset = offset"
          />
        </div>
        <NmorphGuide
          v-model="guideOpen"
          :steps="guideSteps"
          :target-outline-color="guideOutlineColor"
          :target-outline-offset="guideOutlineOffset"
          max-width="320px"
          bordered
        >
          <div class="guide-targets">
            <NmorphGuideStep name="guide-action">
              <NmorphButton text="Primary target" />
            </NmorphGuideStep>
            <NmorphGuideStep name="guide-review">
              <NmorphCallout
                class="guide-review-target"
                type="success"
                title="Review"
                content="The active target receives the outline."
              />
            </NmorphGuideStep>
          </div>
        </NmorphGuide>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphNotificationProvider">
      <div class="row">
        <NmorphButton text="Success" @click="showNotification('success')" />
        <NmorphButton text="Info" design="plain" @click="showNotification('info')">
          <template #icon>
            <NmorphIconBell />
          </template>
        </NmorphButton>
        <NmorphButton text="Warning" @click="showNotification('warning')" />
        <NmorphButton text="Error" @click="showNotification('error')" />
        <NmorphButton text="Sticky" design="plain" @click="showStickyNotification" />
      </div>
      <div class="row">
        <NmorphButton
          v-for="placement in notificationPlacements"
          :key="placement"
          :text="placement"
          design="plain"
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

.guide-targets {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  min-height: 180px;
  padding: 24px 12px;
}

.guide-review-target {
  width: 220px;
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

.drawer-content {
  display: grid;
  gap: 12px;
}

.hint {
  color: var(--nmorph-semi-contrast-text-color);
  font-size: 13px;
}

p {
  margin: 0;
}
</style>
