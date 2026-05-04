<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphBadge,
  NmorphCard,
  NmorphAvatar,
  NmorphProgress,
  NmorphButton,
  NmorphIcon,
  NmorphIconUsers,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const progressValue = ref(65)
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphBadge">
      <div class="row">
        <NmorphBadge :value="3">
          <NmorphButton text="Notifications" />
        </NmorphBadge>
        <NmorphBadge :value="12" color="var(--nmorph-success-color)">
          <template #value="{ value }">
            <div class="badge-value">
              <NmorphIcon width="10px" height="10px" color="currentColor"><NmorphIconUsers /></NmorphIcon>
              <span>{{ value }}</span>
            </div>
          </template>
          <NmorphButton text="Team" />
        </NmorphBadge>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphCard">
      <NmorphCard class="demo-card">
        <p>Card content</p>
      </NmorphCard>
    </SandboxSection>

    <SandboxSection title="NmorphAvatar">
      <div class="row">
        <NmorphAvatar :size="32" />
        <NmorphAvatar :size="48" />
        <NmorphAvatar :size="64" />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphProgress">
      <NmorphProgress :value="progressValue" />
      <p class="hint">{{ progressValue }}%</p>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page { display: grid; gap: 24px; }
.row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.badge-value { display: inline-flex; align-items: center; gap: 4px; }
.demo-card { padding: 16px; }
.demo-card p { margin: 0; }
.hint { margin: 0; font-size: 13px; color: var(--nmorph-text-secondary); }
</style>
