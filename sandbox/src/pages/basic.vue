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
  NmorphLayout,
  NmorphLink,
  NmorphScroll,
  NmorphSpace,
  NmorphText,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const scrollCoords = ref({ x: 0, y: 0 })
const maxHeightElements = ref(10)

const moveScroll = () => {
  scrollCoords.value = { x: 120, y: 160 }
}

const addMaxHeightItem = () => {
  maxHeightElements.value += 1
}

const removeMaxHeightItem = () => {
  maxHeightElements.value = Math.max(0, maxHeightElements.value - 1)
}
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphText">
      <div class="stack text-demo">
        <NmorphText as="h2" variant="title-large" color="contrast">Title large</NmorphText>
        <NmorphText variant="body">Body text with the shared Nmorph typography scale.</NmorphText>
        <NmorphText variant="caption" color="semi-contrast">Caption text</NmorphText>
        <NmorphText variant="label" color="accent">Accent label</NmorphText>
        <NmorphText class="text-demo__truncate" truncate>
          Long single-line text that is intentionally truncated by the NmorphText component.
        </NmorphText>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphButton">
      <div class="stack">
        <div class="row">
          <NmorphButton text="Default" />
          <NmorphButton text="Thin" thickness="thin" />
          <NmorphButton text="Thick" thickness="thick" />
          <NmorphButton text="Loading" loading />
          <NmorphButton text="Disabled" disabled />
        </div>
        <div class="row">
          <NmorphButton text="Transparent" design="plain" />
          <NmorphButton text="Custom color" design="plain" color="var(--nmorph-success-color)" />
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
          <NmorphButton text="With icon" design="plain">
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

    <SandboxSection title="NmorphLayout">
      <NmorphLayout class="layout-demo" gap="12px" aside-width="150px">
        <template #header>
          <div class="layout-demo__block">Header</div>
        </template>
        <template #aside>
          <div class="layout-demo__block layout-demo__block--aside">Aside</div>
        </template>
        <div class="layout-demo__block layout-demo__block--main">
          <strong>Main</strong>
          <span>Flexible content region</span>
        </div>
        <template #footer>
          <div class="layout-demo__block">Footer</div>
        </template>
      </NmorphLayout>
    </SandboxSection>

    <SandboxSection title="NmorphSpace">
      <div class="stack">
        <NmorphSpace wrap size="large" align="center">
          <NmorphButton text="Save" />
          <NmorphButton text="Cancel" design="plain" />
          <NmorphButton text="Disabled" disabled />
        </NmorphSpace>
        <NmorphSpace direction="column" size="small" fill>
          <span class="space-line">Column item one</span>
          <span class="space-line">Column item two</span>
          <span class="space-line">Column item three</span>
        </NmorphSpace>
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
          <NmorphButton text="Move to content" thickness="thin" @click="moveScroll" />
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
        <div class="scroll-max-height-overview">
          <div class="row">
            <NmorphButton @click="addMaxHeightItem">Add</NmorphButton>
            <NmorphButton @click="removeMaxHeightItem">Remove</NmorphButton>
          </div>
          <NmorphScroll max-height="300px" class="scroll-max-height">
            <div v-for="item in maxHeightElements" :key="item" class="scroll-max-height__box">
              {{ item }}
            </div>
          </NmorphScroll>
        </div>
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

.text-demo__truncate {
  max-width: 260px;
}

.layout-demo {
  max-width: 640px;
}

.layout-demo__block {
  display: grid;
  min-height: 48px;
  place-items: center;
  padding: 12px;
  border-radius: 8px;
  background: var(--nmorph-main-color);
  box-shadow:
    -2px -2px 4px var(--nmorph-light-shade-color),
    2px 2px 4px var(--nmorph-dark-shade-color);
}

.layout-demo__block--aside,
.layout-demo__block--main {
  min-height: 120px;
}

.layout-demo__block--main {
  gap: 4px;
}

.space-line {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--nmorph-accent-color) 8%, var(--nmorph-main-color));
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

.scroll-max-height-overview {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.scroll-max-height {
  width: 100%;
  padding-right: 8px;
  text-align: center;
}

.scroll-max-height__box {
  margin-bottom: 8px;
  color: var(--nmorph-focus-text-color);
  background: var(--nmorph-accent-color);
}
</style>
