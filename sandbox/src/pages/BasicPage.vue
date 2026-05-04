<script setup lang="ts">
import {
  NmorphButton,
  NmorphIcon,
  NmorphIconCheck,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphButton">
      <div class="row">
        <NmorphButton text="Default" />
        <NmorphButton text="Thin" height="thin" />
        <NmorphButton text="Thick" height="thick" />
        <NmorphButton :disabled="true" text="Disabled" />
      </div>
      <div class="row">
        <NmorphButton>
          <div class="with-icon">
            <NmorphIcon><NmorphIconCheck /></NmorphIcon>
            <span>With icon</span>
          </div>
        </NmorphButton>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphIcon">
      <div class="row">
        <NmorphIcon width="16px" height="16px"><NmorphIconCheck /></NmorphIcon>
        <NmorphIcon width="24px" height="24px"><NmorphIconCheck /></NmorphIcon>
        <NmorphIcon width="32px" height="32px" color="var(--nmorph-primary-color)"><NmorphIconCheck /></NmorphIcon>
      </div>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page { display: grid; gap: 24px; }
.row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.with-icon { display: flex; align-items: center; gap: 6px; }
</style>
