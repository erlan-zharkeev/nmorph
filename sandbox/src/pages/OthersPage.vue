<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphButton,
  NmorphDivider,
  NmorphOverlay,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const overlayVisible = ref(false)
const transparentOverlayVisible = ref(false)
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphDivider">
      <div class="stack">
        <p>Above the horizontal divider</p>
        <NmorphDivider />
        <p>Below the horizontal divider</p>
        <div class="divider-row">
          <span>Left</span>
          <NmorphDivider direction="vertical" />
          <span>Right</span>
        </div>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphOverlay">
      <div class="row">
        <NmorphButton text="Show overlay" @click="overlayVisible = true" />
        <NmorphButton text="Transparent overlay" style-type="transparent" @click="transparentOverlayVisible = true" />
      </div>
      <NmorphOverlay :show="overlayVisible" @on-outside-click="overlayVisible = false">
        <div class="overlay-panel">
          <h3>Overlay content</h3>
          <p>Click outside or the button to close.</p>
          <NmorphButton text="Close" @click="overlayVisible = false" />
        </div>
      </NmorphOverlay>
      <NmorphOverlay :show="transparentOverlayVisible" transparent @on-outside-click="transparentOverlayVisible = false">
        <div class="overlay-panel overlay-panel--transparent">
          <h3>Transparent overlay</h3>
          <NmorphButton text="Close" style-type="transparent" @click="transparentOverlayVisible = false" />
        </div>
      </NmorphOverlay>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.stack {
  display: grid;
  gap: 12px;
}

.row,
.divider-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: stretch;
}

.divider-row {
  min-height: 42px;
  align-items: center;
}

.stack p,
.overlay-panel p,
.overlay-panel h3 {
  margin: 0;
}

.overlay-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  display: grid;
  gap: 12px;
  width: min(360px, calc(100vw - 32px));
  padding: 20px;
  border-radius: 8px;
  background: var(--nmorph-main-color);
  box-shadow:
    -4px -4px 8px var(--nmorph-light-shade-color),
    4px 4px 8px var(--nmorph-dark-shade-color);
  transform: translate(-50%, -50%);
}

.overlay-panel--transparent {
  top: 64px;
  transform: translateX(-50%);
}
</style>
