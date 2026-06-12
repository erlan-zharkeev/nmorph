<script setup lang="ts">
import { NmorphCard, NmorphProgress } from "@nmorph/nmorph-ui-kit";

const showInitialLoader = ref(true);

let initialLoaderTimeoutId: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  requestAnimationFrame(() => {
    initialLoaderTimeoutId = setTimeout(() => {
      showInitialLoader.value = false;
      initialLoaderTimeoutId = null;
    }, 120);
  });
});

onBeforeUnmount(() => {
  if (initialLoaderTimeoutId === null) return;

  clearTimeout(initialLoaderTimeoutId);
});
</script>

<template>
  <TopBar />
  <main
    class="docs-default-layout__main"
    :class="{ 'docs-default-layout__main--loading': showInitialLoader }"
    :aria-busy="showInitialLoader"
  >
    <div class="docs-default-layout__page">
      <NuxtPage />
    </div>
    <div
      v-if="showInitialLoader"
      class="docs-default-layout__loader"
      aria-label="Loading page"
      role="status"
    >
      <NmorphCard
        class="docs-default-layout__loader-card"
        :fill="false"
        :paper="3"
        padding="0"
        radius="4px"
        shadow-type="not-defined"
      >
        <div class="docs-default-layout__loader-card-content">
          <NmorphProgress
            class="docs-default-layout__progress"
            :percentage="100"
            :value-right-side="false"
            indeterminate
          />
        </div>
      </NmorphCard>
    </div>
  </main>
  <FooterBar />
</template>

<style lang="scss" scoped>
.docs-default-layout__main {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.docs-default-layout__page {
  height: 100%;
  min-height: 0;
}

.docs-default-layout__main--loading .docs-default-layout__page {
  visibility: hidden;
}

.docs-default-layout__loader {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: var(--docs-layout-shadow-space);
  color: var(--nmorph-semi-contrast-text-color);
  background: var(--nmorph-main-color);
}

.docs-default-layout__loader-card {
  width: 100%;
  height: 100%;
  background: var(--nmorph-main-color);
  box-shadow:
    var(--docs-layout-shadow-width) var(--docs-layout-shadow-width) var(--docs-layout-shadow-blur)
      var(--nmorph-dark-shade-color),
    calc(-1 * var(--docs-layout-shadow-width)) calc(-1 * var(--docs-layout-shadow-width))
      var(--docs-layout-shadow-blur) var(--nmorph-light-shade-color);
}

.docs-default-layout__loader-card :deep(.nmorph-card__content) {
  height: 100%;
}

.docs-default-layout__loader-card-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--docs-content-padding);
}

.docs-default-layout__progress {
  display: block;
  width: min(260px, 100%);
}
</style>
