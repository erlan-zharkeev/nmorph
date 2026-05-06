<script lang="ts" setup>
import {
  NmorphDivider,
  type NmorphCoordsType
} from "@nmorph/nmorph-ui-kit";
import { QuickStart, Config, Other } from '~/components/guide-page-sections'
import GuideMenu from "~/components/guide-menu/GuideMenu.vue";
import MainContentPart from "~/layouts/MainContentPart.vue";

const scrollDomRef = ref<null | { scroll: { moveTo: (coords: NmorphCoordsType) => void } }>(null);
const route = useRoute();

const anchors = ['#quick-start', '#config', '#other']

const anchorCoordsMap = ref<Record<string, number>>({})
const hashInIntersection = ref(route.hash);

const moveToHash = () => {
  if (!route.hash || !scrollDomRef.value) return
  scrollDomRef.value.scroll.moveTo({ x: 0, y: anchorCoordsMap.value[route.hash] });
}

watch(
  () => route.hash,
  () => {
    moveToHash()
  },
  { immediate: true }
);

const updateAnchorCoordsMap = () => {
  anchors.forEach((anchor) => {
    const targetElement = document.querySelector(anchor);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      anchorCoordsMap.value[anchor] = rect.top;
    }
  })
}

const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hashInIntersection.value = entry.target.id;
    }
  });
};

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  updateAnchorCoordsMap()
  window.addEventListener('resize', updateAnchorCoordsMap)

  observer.value = new IntersectionObserver(intersectionCallback, {
    root: document.querySelector("#page-content-part"),
    threshold: 0.3
  });

  anchors.forEach((anchor) => {
    const targetElement = document.querySelector(anchor);
    if (targetElement && observer.value) {
      observer.value.observe(targetElement);
    }
  });
})

onUnmounted(() => {
  window.removeEventListener('resize', updateAnchorCoordsMap);
  if (observer.value) observer.value.disconnect();
})
</script>

<template>
  <div class="docs-guide-page nmorph-docs-content nmorph--shadow-outset">
    <MainContentPart ref="scrollDomRef">
      <template #aside>
        <GuideMenu :active-anchor="`#${hashInIntersection}`" />
      </template>
      <template #default>
        <QuickStart id="quick-start" class="info-section quick-start-section" />
        <NmorphDivider />
        <Config id="config" class="info-section config-section" />
        <NmorphDivider />
        <Other id="other" class="info-section other-section" />
      </template>
    </MainContentPart>
  </div>
</template>

<style lang="scss">
.docs-guide-page {
  width: calc(100% - 16px);
  margin: 8px;
  border-radius: 4px;

  .nmorph-docs-content {
    height: calc(var(--container-height) - 16px) !important;
  }
}

.info-section {
  padding: 16px;
  margin-bottom: 16px;
}

.nmorph-callout {
  margin-top: 8px;
  max-width: 900px;
}

.section-title {
  margin-bottom: 16px;
}

.section-element {
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
}
</style>
