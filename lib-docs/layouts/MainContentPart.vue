<script setup lang="ts">
import { NmorphScroll, NmorphBacktop, type INmorphScrollExpose } from "@nmorph/nmorph-ui-kit";
import { nextTick, useSlots } from "vue";

interface IProps {
  leftAsideScrollKey?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  leftAsideScrollKey: "",
});

const router = useRouter();

const scroll = ref<INmorphScrollExpose | null>(null);
const leftAsideScroll = ref<INmorphScrollExpose | null>(null);
defineExpose({ scroll });

const isRouteReady = ref(false);

let timeoutId: ReturnType<typeof setTimeout> | null = null;

const leftAsideStorageKey = computed(() => {
  const key = props.leftAsideScrollKey || router.currentRoute.value.path;

  return `nmorph-docs:left-aside-scroll:${key}`;
});

const getSavedLeftAsideScrollTop = () => {
  if (!import.meta.client) return 0;

  const savedScrollTop = Number(sessionStorage.getItem(leftAsideStorageKey.value) ?? 0);

  return Number.isFinite(savedScrollTop) ? savedScrollTop : 0;
};

const leftAsideScrollPosition = ref({
  x: 0,
  y: getSavedLeftAsideScrollTop(),
});

const saveLeftAsideScroll = (event?: Event) => {
  if (!import.meta.client) return;

  const target = event?.target as HTMLElement | undefined;
  const scrollContainer = target ?? leftAsideScroll.value?.scrollDOMContainer;

  if (!scrollContainer) return;

  sessionStorage.setItem(leftAsideStorageKey.value, String(Math.trunc(scrollContainer.scrollTop)));
};

const restoreLeftAsideScroll = async () => {
  if (!import.meta.client) return;

  const savedScrollTop = getSavedLeftAsideScrollTop();
  leftAsideScrollPosition.value = {
    x: 0,
    y: savedScrollTop,
  };

  await nextTick();

  const scrollContainer = leftAsideScroll.value?.scrollDOMContainer;

  if (!scrollContainer) return;

  scrollContainer.scrollTop = savedScrollTop;
};

onMounted(async () => {
  await router.isReady();
  await restoreLeftAsideScroll();
  timeoutId = setTimeout(() => {
    isRouteReady.value = true;
  }, 0);
});

onBeforeUnmount(saveLeftAsideScroll);

onUnmounted(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
});

watch(leftAsideStorageKey, restoreLeftAsideScroll);

const isMainFullPage = computed(() => !router.currentRoute.value.fullPath.includes("elements"));
const slots = useSlots() as Record<string, unknown>;
</script>

<template>
  <div class="docs-main-layout">
    <NmorphScroll
      ref="leftAsideScroll"
      :model-value="leftAsideScrollPosition"
      css-scroll-behavior="auto"
      class="docs-main-layout__scroll-container nmorph--shadow-outset docs-main-layout__card docs-main-layout__left-aside"
      @on-scroll="saveLeftAsideScroll"
    >
      <aside>
        <slot name="aside" />
      </aside>
    </NmorphScroll>
    <NmorphScroll ref="scroll" class="docs-main-layout__scroll-container nmorph--shadow-outset docs-main-layout__card"
      id="page-content-part">
      <main
        class="docs-main-layout__center"
        :class="{
          'docs-main-layout__center--full-page': isMainFullPage,
          'docs-main-layout__center--lib-page': !isMainFullPage,
        }"
      >
        <slot name="default" />
      </main>
      <aside class="docs-main-layout__card nmorph--shadow-inset docs-main-layout__center-aside"
        v-if="slots['aside-right'] && isRouteReady && !isMainFullPage">
        <slot name="aside-right" />
      </aside>
      <NmorphBacktop design="plain" class="docs-main-layout__backtop" />
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-main-layout__backtop {
  z-index: 2;
}

.docs-main-layout {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 4fr;
}

.docs-main-layout__card {
  border-radius: 4px;
  padding: 8px;
  padding-bottom: 8px;
  height: calc(var(--container-height) - 24px) !important;
}

.docs-main-layout__scroll-container {
  display: flex;
  justify-content: space-between;
  height: var(--container-height) !important;
}

.docs-main-layout__center {
  width: calc(100% - 200px);
}

.docs-main-layout__center--lib-page {
  width: calc(100% - 224px);
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
  }
}
</style>
