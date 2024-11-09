<script setup lang="ts">
import { NmorphScroll, NmorphBacktop } from "@nmorph/nmorph-ui-kit";
const router = useRouter();

const scroll = ref(null);
defineExpose({ scroll });

const isRouteReady = ref(false);

let timeoutId: ReturnType<typeof setTimeout> | null = null;

onMounted(async () => {
  await router.isReady();
  timeoutId = setTimeout(() => {
    isRouteReady.value = true;
  }, 0);
});

onUnmounted(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
});

const isComponentOverview = computed(() =>
  router.currentRoute.value.fullPath.includes("components/overview")
);
</script>

<template>
  <div class="docs-main-layout">
    <aside
      class="docs-main-layout__card nmorph--shadow-outset docs-main-layout__left-aside"
    >
      <slot name="aside" />
    </aside>
    <NmorphScroll
      ref="scroll"
      class="docs-main-layout__scroll-container nmorph--shadow-outset docs-main-layout__card"
    >
      <main
        class="docs-main-layout__center"
        :class="{ 'docs-main-layout__center--full-page': isComponentOverview }"
      >
        <slot name="default" />
      </main>
      <aside
        class="docs-main-layout__card nmorph--shadow-inset docs-main-layout__center-aside"
        v-if="isRouteReady && !isComponentOverview"
      >
        <slot name="aside-right" />
      </aside>
      <NmorphBacktop design="common" />
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-main-layout {
  padding: 10px 10px 10px 8px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 4fr;
}

.docs-main-layout__card {
  border-radius: 4px;
  padding: 8px;
}

.docs-main-layout__scroll-container {
  display: flex;
  justify-content: space-between;
  height: var(--container-height);
}

.docs-main-layout__center {
  width: calc(100% - 200px);
}

.docs-main-layout__center--full-page {
  width: 100%;
}

.docs-main-layout__center-aside {
  position: sticky;
  top: 0;
  width: 200px;
}

@include max-width-query(1024) {
  .docs-main-layout__center-aside {
    display: none;
  }
  .docs-main-layout__center {
    width: 100%;
  }
}

@include max-width-query(768) {
  .docs-main-layout__left-aside {
    display: none;
  }
  .docs-main-layout {
    grid-template-columns: 1fr;
    padding-left: 2px;
    padding-right: 2px;
  }
}
</style>
