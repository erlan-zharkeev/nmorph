<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphDivider,
  NmorphOverlay,
  NmorphButton,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const overlayVisible = ref(false)
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphDivider">
      <p>Above the divider</p>
      <NmorphDivider />
      <p>Below the divider</p>
    </SandboxSection>

    <SandboxSection title="NmorphOverlay">
      <NmorphButton text="Show overlay" @click="overlayVisible = true" />
      <NmorphOverlay v-model="overlayVisible" @click="overlayVisible = false" />
    </SandboxSection>
  </div>
</template>

<style scoped>
.page { display: grid; gap: 24px; }
</style>
