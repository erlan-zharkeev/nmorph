<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NmorphSwitch, useNmorph } from '@nmorph/nmorph-ui-kit'
import { getStoredLocale, saveLocale } from '@sandbox/locale'

const { locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const { theme } = useNmorph()
const currentTheme = theme.currentTheme

const nav = [
  { path: '/basic', label: 'Basic' },
  { path: '/form', label: 'Form' },
  { path: '/feedback', label: 'Feedback' },
  { path: '/data', label: 'Data' },
  { path: '/navigation', label: 'Navigation' },
  { path: '/others', label: 'Others' },
]

const languages = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
  { value: 'zh', label: 'ZH' },
]

const isDarkTheme = computed(() => currentTheme.value === 'dark')

const toggleTheme = (value: boolean | string | number) => {
  theme.setTheme(value ? 'dark' : 'light')
}

const setLocale = (value: string) => {
  locale.value = value
}

onMounted(() => {
  locale.value = getStoredLocale()
})

watch(
  locale,
  (value) => {
    saveLocale(value)
  },
  { immediate: true }
)
</script>

<template>
  <div class="layout">
    <header class="layout-top-bar">
      <div class="layout-top-bar__inner">
        <NuxtLink to="/basic" class="layout-top-bar__brand">Sandbox</NuxtLink>
        <nav class="layout-top-bar__nav" aria-label="Sandbox pages">
          <NuxtLink
            v-for="item in nav"
            :key="item.path"
            :to="item.path"
            class="layout-top-bar__nav-item"
            :class="{ 'layout-top-bar__nav-item--active': route.path === item.path }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
      <ClientOnly>
        <div class="layout-top-bar__controls">
          <div class="layout-top-bar__segmented" aria-label="Language">
            <button
              v-for="language in languages"
              :key="language.value"
              type="button"
              class="layout-top-bar__segment"
              :class="{ 'layout-top-bar__segment--active': locale === language.value }"
              @click="setLocale(language.value)"
            >
              {{ language.label }}
            </button>
          </div>
          <div class="layout-top-bar__control">
            <span class="layout-top-bar__control-label">Light</span>
            <NmorphSwitch :model-value="isDarkTheme" @update:model-value="toggleTheme" />
            <span class="layout-top-bar__control-label">Dark</span>
          </div>
        </div>
      </ClientOnly>
    </header>
    <main class="layout__content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}

.layout-top-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 12px 24px;
  background: color-mix(in srgb, var(--nmorph-main-color) 92%, transparent);
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--nmorph-text-color) 8%, transparent),
    0 6px 18px color-mix(in srgb, var(--nmorph-dark-shade-color) 45%, transparent);
  backdrop-filter: blur(14px);
}

.layout-top-bar__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.layout-top-bar__brand {
  color: var(--nmorph-text-color);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.layout-top-bar__nav {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.layout-top-bar__nav-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--nmorph-semi-contrast-text-color);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition:
    background 0.15s,
    border-color 0.15s,
    box-shadow 0.15s,
    color 0.15s;
  text-decoration: none;
}

.layout-top-bar__nav-item:hover {
  border-color: color-mix(in srgb, var(--nmorph-accent-color) 26%, transparent);
  background: color-mix(in srgb, var(--nmorph-accent-color) 12%, var(--nmorph-main-color));
  color: var(--nmorph-text-color);
}

.layout-top-bar__nav-item--active {
  border-color: color-mix(in srgb, var(--nmorph-accent-color) 70%, var(--nmorph-light-shade-color));
  background: var(--nmorph-accent-color);
  color: var(--nmorph-focus-text-color);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--nmorph-accent-color) 34%, transparent),
    0 6px 14px color-mix(in srgb, var(--nmorph-accent-color) 26%, transparent);
}

.layout-top-bar__nav-item--active:hover {
  background: color-mix(in srgb, var(--nmorph-accent-color) 88%, var(--nmorph-text-color));
  color: var(--nmorph-focus-text-color);
}

.layout-top-bar__controls {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.layout-top-bar__control,
.layout-top-bar__segmented {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--nmorph-main-color);
  box-shadow:
    -2px -2px 4px var(--nmorph-light-shade-color),
    2px 2px 4px var(--nmorph-dark-shade-color);
}

.layout-top-bar__segment {
  min-width: 34px;
  padding: 4px 8px;
  border: 0;
  border-radius: 999px;
  color: var(--nmorph-semi-contrast-text-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
}

.layout-top-bar__segment:hover {
  color: var(--nmorph-text-color);
  background: color-mix(in srgb, var(--nmorph-text-color) 10%, transparent);
}

.layout-top-bar__segment--active {
  color: var(--nmorph-white-color);
  background: var(--nmorph-accent-color);
}

.layout-top-bar__control-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--nmorph-semi-contrast-text-color);
}

.layout__content {
  padding: 32px 24px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 640px) {
  .layout-top-bar {
    padding: 12px 16px;
  }

  .layout__content {
    padding: 24px 16px;
  }
}
</style>
