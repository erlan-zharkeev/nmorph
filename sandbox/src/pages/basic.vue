<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphButton,
  NmorphIcon,
  NmorphIconCheck,
  NmorphIconDownload,
  NmorphIconLink,
  NmorphIconPlus,
  NmorphIconSearch,
  NmorphIconStar,
  NmorphLink,
  NmorphScroll,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const scrollCoords = ref({ x: 0, y: 0 })

const moveScroll = () => {
  scrollCoords.value = { x: 120, y: 160 }
}
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphButton">
      <div class="stack">
        <div class="row">
          <NmorphButton text="Default" />
          <NmorphButton text="Thin" height="thin" />
          <NmorphButton text="Thick" height="thick" />
          <NmorphButton text="Loading" loading />
          <NmorphButton text="Disabled" disabled />
        </div>
        <div class="row">
          <NmorphButton text="Transparent" style-type="transparent" />
          <NmorphButton text="Custom color" style-type="transparent" color="var(--nmorph-success-color)" />
          <NmorphButton text="Accent hover" accent-bg-on-hover />
          <NmorphButton text="No ripple" :ripple="false" />
        </div>
        <div class="row">
          <NmorphButton text="Round" shape="round" />
          <NmorphButton shape="circle">
            <template #icon-only>
              <NmorphIconPlus />
            </template>
          </NmorphButton>
          <NmorphButton shape="square">
            <template #icon-only>
              <NmorphIconSearch />
            </template>
          </NmorphButton>
          <NmorphButton text="With icon" style-type="transparent">
            <template #icon>
              <NmorphIconCheck />
            </template>
            <template #append>
              <NmorphIcon width="14px" height="14px">
                <NmorphIconStar />
              </NmorphIcon>
            </template>
          </NmorphButton>
        </div>
        <NmorphButton text="Fill button" fill />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphIcon">
      <div class="row">
        <NmorphIcon size="small"><NmorphIconCheck /></NmorphIcon>
        <NmorphIcon size="medium"><NmorphIconCheck /></NmorphIcon>
        <NmorphIcon size="large"><NmorphIconCheck /></NmorphIcon>
        <NmorphIcon width="28px" height="28px" color="var(--nmorph-accent-color)"><NmorphIconDownload /></NmorphIcon>
        <NmorphIcon width="36px" height="20px" color="var(--nmorph-success-color)"><NmorphIconLink /></NmorphIcon>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphLink">
      <div class="row">
        <NmorphLink href="/basic" text="Accent" />
        <NmorphLink href="/form" text="Success" type="success" underline />
        <NmorphLink href="/feedback" text="Warning" type="warning" />
        <NmorphLink href="/data" text="Error" type="error" underline>
          <template #icon>
            <NmorphIconLink />
          </template>
        </NmorphLink>
        <NmorphLink text="Disabled" disabled />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphScroll">
      <div class="stack">
        <div class="row">
          <NmorphButton text="Move to content" height="thin" @click="moveScroll" />
          <span class="hint">x: {{ scrollCoords.x }}, y: {{ scrollCoords.y }}</span>
        </div>
        <NmorphScroll
          v-model="scrollCoords"
          height="180px"
          max-height="180px"
          scroll-x-prop="auto"
          scroll-y-prop="auto"
          :scroll-end-delay="120"
          :y-bar-width-in-px="8"
          :x-bar-width-in-px="8"
        >
          <div class="scroll-content">
            <div v-for="item in 18" :key="item" class="scroll-item">Scrollable row {{ item }}</div>
          </div>
        </NmorphScroll>
      </div>
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

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.hint {
  margin: 0;
  font-size: 13px;
  color: var(--nmorph-semi-contrast-text-color);
}

.scroll-content {
  display: grid;
  width: 760px;
  gap: 8px;
  padding: 8px;
}

.scroll-item {
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--nmorph-main-color);
  box-shadow:
    -2px -2px 4px var(--nmorph-light-shade-color),
    2px 2px 4px var(--nmorph-dark-shade-color);
}
</style>
