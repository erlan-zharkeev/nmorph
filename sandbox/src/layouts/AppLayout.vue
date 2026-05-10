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

const isDarkTheme = computed(() => currentTheme.value === 'dark')
const isRussian = computed(() => locale.value === 'ru')

const toggleTheme = (value: boolean | string | number) => {
  theme.setTheme(value ? 'dark' : 'light')
}

const toggleLocale = (value: boolean | string | number) => {
  locale.value = value ? 'ru' : 'en'
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
    <header class="layout__header">
      <nav class="layout__nav">
        <NuxtLink
          v-for="item in nav"
          :key="item.path"
          :to="item.path"
          class="layout__nav-item"
          :class="{ 'layout__nav-item--active': route.path === item.path }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <ClientOnly>
        <div class="layout__controls">
          <div class="layout__control">
            <span class="layout__control-label">EN</span>
            <NmorphSwitch :model-value="isRussian" @update:model-value="toggleLocale" />
            <span class="layout__control-label">RU</span>
          </div>
          <div class="layout__control">
            <span class="layout__control-label">Light</span>
            <NmorphSwitch :model-value="isDarkTheme" @update:model-value="toggleTheme" />
            <span class="layout__control-label">Dark</span>
          </div>
        </div>
      </ClientOnly>
    </header>
    <main class="layout__content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}

.layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 12px 24px;
  border-bottom: 1px solid var(--nmorph-border-color);
  background: var(--nmorph-card-bg);
}

.layout__nav {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.layout__nav-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--nmorph-text-secondary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.layout__nav-item:hover {
  background: var(--nmorph-hover-bg);
  color: var(--nmorph-text-color);
}

.layout__nav-item--active {
  background: var(--nmorph-primary-color);
  color: #fff;
}

.layout__controls {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.layout__control {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--nmorph-main-color);
  box-shadow:
    -2px -2px 4px var(--nmorph-light-shade-color),
    2px 2px 4px var(--nmorph-dark-shade-color);
}

.layout__control-label {
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
  .layout__header {
    padding: 12px 16px;
  }

  .layout__content {
    padding: 24px 16px;
  }
}
</style>
