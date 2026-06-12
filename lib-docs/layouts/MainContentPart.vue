<script setup lang="ts">
import {
  NmorphBacktop,
  NmorphCard,
  NmorphLayout,
  NmorphScroll,
  type INmorphScrollExpose,
} from "@nmorph/nmorph-ui-kit";
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
});

onBeforeUnmount(saveLeftAsideScroll);

watch(leftAsideStorageKey, restoreLeftAsideScroll);

const isMainFullPage = computed(() => !router.currentRoute.value.fullPath.includes("elements"));
const slots = useSlots() as Record<string, unknown>;
const showCenterAside = computed(() => Boolean(slots["aside-right"]) && !isMainFullPage.value);
</script>

<template>
  <NmorphLayout
    class="docs-main-layout"
    gap="var(--docs-layout-shadow-space)"
    aside-width="clamp(220px, 20vw, 320px)"
    full-height
  >
    <template #aside>
      <NmorphCard
        shadow-type="not-defined"
        :paper="3"
        padding="0"
        radius="4px"
        content-class="docs-main-layout__card-content"
        class="docs-main-layout__card docs-main-layout__card--outset docs-main-layout__left-aside"
      >
        <NmorphScroll
          ref="leftAsideScroll"
          :model-value="leftAsideScrollPosition"
          css-scroll-behavior="auto"
          :y-gap-in-px="8"
          class="docs-main-layout__scroll-container"
          @on-scroll="saveLeftAsideScroll"
        >
          <aside class="docs-main-layout__aside-content">
            <slot name="aside" />
          </aside>
        </NmorphScroll>
      </NmorphCard>
    </template>
    <NmorphCard
      shadow-type="not-defined"
      :paper="3"
      padding="0"
      radius="4px"
      content-class="docs-main-layout__card-content"
      class="docs-main-layout__card docs-main-layout__card--outset"
    >
      <NmorphScroll
        id="page-content-part"
        ref="scroll"
        :y-gap-in-px="8"
        class="docs-main-layout__scroll-container"
      >
        <NmorphLayout
          v-if="showCenterAside"
          class="docs-main-layout__content-layout"
          gap="var(--docs-layout-shadow-space)"
          aside-width="200px"
          aside-position="right"
          full-height
        >
          <main class="docs-main-layout__center docs-main-layout__center--lib-page">
            <slot name="default" />
          </main>
          <template #aside>
            <NmorphCard
              tag="aside"
              shadow-type="not-defined"
              :paper="3"
              radius="4px"
              content-class="docs-main-layout__card-content"
              class="docs-main-layout__card docs-main-layout__card--inset docs-main-layout__center-aside"
            >
              <slot name="aside-right" />
            </NmorphCard>
          </template>
        </NmorphLayout>
        <main v-else class="docs-main-layout__center docs-main-layout__center--full-page">
          <slot name="default" />
        </main>
        <NmorphBacktop design="plain" class="docs-main-layout__backtop" />
      </NmorphScroll>
    </NmorphCard>
  </NmorphLayout>
</template>

<style lang="scss">
.docs-main-layout__backtop {
  z-index: 2;
}

.docs-main-layout {
  height: 100%;
  min-height: 0;
  padding: var(--docs-layout-shadow-space);
}

.docs-main-layout__card {
  border-radius: 4px;
  background: var(--nmorph-main-color);
  height: 100%;
}

.docs-main-layout .docs-main-layout__card-content {
  height: 100%;
  min-height: 0;
}

.docs-main-layout__card--outset {
  box-shadow:
    var(--docs-layout-shadow-width) var(--docs-layout-shadow-width) var(--docs-layout-shadow-blur)
      var(--nmorph-dark-shade-color),
    calc(-1 * var(--docs-layout-shadow-width)) calc(-1 * var(--docs-layout-shadow-width))
      var(--docs-layout-shadow-blur) var(--nmorph-light-shade-color);
}

.docs-main-layout__card--inset {
  box-shadow:
    inset var(--docs-layout-shadow-width) var(--docs-layout-shadow-width) var(--docs-layout-shadow-blur)
      var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--docs-layout-shadow-width)) calc(-1 * var(--docs-layout-shadow-width))
      var(--docs-layout-shadow-blur) var(--nmorph-light-shade-color);
}

.docs-main-layout__scroll-container {
  min-height: 0;
}

.docs-main-layout__content-layout {
  height: 100%;
  min-height: 0;
}

.docs-main-layout__center {
  min-width: 0;
  padding: var(--docs-content-padding);
}

.docs-main-layout__aside-content {
  padding: var(--docs-content-padding);
}

.docs-main-layout__center--lib-page {
  width: 100%;
}

.docs-main-layout__center--full-page {
  width: 100%;
}

.docs-main-layout__center-aside {
  position: sticky;
  top: var(--docs-content-padding);
  width: 100%;
  margin-top: var(--docs-content-padding);
  padding: var(--docs-content-padding);
  height: fit-content;
  max-height: calc(100% - var(--docs-content-padding));
}

@include max-width-query(1024) {
  .docs-main-layout__content-layout > .nmorph-layout__body > .nmorph-layout__aside {
    display: none;
  }

  .docs-main-layout__center-aside {
    display: none;
  }

  .docs-main-layout__center {
    width: 100%;
    padding: 8px 12px;
  }

  .docs-main-layout__aside-content {
    padding: 8px 12px;
  }
}

@include max-width-query(768) {
  .docs-main-layout__left-aside {
    display: none;
  }

  .docs-main-layout > .nmorph-layout__body > .nmorph-layout__aside {
    display: none;
  }
}
</style>
