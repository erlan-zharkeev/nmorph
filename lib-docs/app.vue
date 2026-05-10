<script setup>
import { onMounted, onUnmounted } from "vue";
import {
  NmorphNotificationProvider,
  nmorphLog,
} from "@nmorph/nmorph-ui-kit";
import { notificationProvider } from "~/providers";
import projectData from "./package.json";

const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

onMounted(() => {
  if (import.meta.client) {
    nmorphLog("success", `NMORPH DOCS (v${projectData.version})`);
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
  }
});

onUnmounted(async () => {
  if (import.meta.client) window.removeEventListener('resize', updateViewportHeight);
});
</script>

<template>
  <ClientOnly>
    <NmorphNotificationProvider :notifications="notificationProvider.notifications.value" placement="top-center" />
  </ClientOnly>
  <div class="docs-shell">
    <div class="docs">
      <NuxtLayout name="default" />
    </div>
    <div class="docs-unsupported">
      <div class="docs-unsupported__card nmorph--shadow-outset">
        <h1>{{ $t("unsupported-resolution.title") }}</h1>
        <p>{{ $t("unsupported-resolution.description") }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "~/assets/style/index.scss";

html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.docs {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.docs-shell {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}

.docs-unsupported {
  display: none;
  min-height: calc(var(--vh, 1vh) * 100);
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--nmorph-main-color);
}

.docs-unsupported__card {
  width: 100%;
  max-width: 320px;
  padding: 24px 16px;
  border-radius: 24px;
  background: var(--nmorph-main-color);
  text-align: center;

  h1 {
    margin: 0 0 12px;
    font-size: 20px;
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: var(--nmorph-semi-contrast-text-color);
    line-height: 1.4;
  }
}

@media (max-width: 319px) {
  .docs {
    display: none;
  }

  .docs-unsupported {
    display: flex;
  }
}
</style>
