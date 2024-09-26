<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import ComponentsList from "~/components/component-list/component-list.vue";
import { capitalizeFirstChar } from "@nmorph/nmorph-ui-kit";

const componentPage = ref<HTMLElement | null>(null);
const navigationContents = ref<string[]>([]);
const timeoutScrollId = ref(null);
const router = useRouter();

watch(
  () => router.currentRoute.value,
  () => {
    nextTick(() => {
      doUpdate();
    });
  }
);

const scrollToAnchor = (anchor: string) => {
  const offsetFromCurrent = document
    .getElementById(anchor)
    .getBoundingClientRect().top;
  const y =
    offsetFromCurrent + scroll.value.scroll.scrollDOMContainer.scrollTop;
  scroll.value.scroll.moveTo({ x: 0, y });
};

watch(
  () => router.currentRoute.value.hash,
  () => {
    scrollToAnchor(router.currentRoute.value.hash.substring(1));
  }
);

onMounted(() => {
  observer.value = new IntersectionObserver(updateActiveAnchor, {
    root: null,
    rootMargin: "-10px 0px -90% 0px",
    threshold: 0,
  });
  doUpdate();
  const timeoutScrollId = setTimeout(() => {
    scrollToAnchor(router.currentRoute.value.hash.substring(1));
  }, 400);
});

onUnmounted(() => {
  if (timeoutScrollId.value !== null) clearTimeout(timeoutScrollId.value);
  if (observer.value) observer.value.disconnect();
});

const doUpdate = () => {
  if (!componentPage.value) return;
  const matchedEl = componentPage.value.querySelectorAll('[id^="content-"]');
  navigationContents.value = [];
  matchedEl.forEach((element) => {
    navigationContents.value.push(element.id);
    if (!observer.value) return;
    observer.value.observe(element);
  });
};

const activeAnchor = ref("");
const observer = ref<IntersectionObserver | null>(null);
const scroll = ref(null);

const updateActiveAnchor = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio > 0) {
      activeAnchor.value = entry.target.id;
    }
  });
};

const linkName = (anchor: string) => {
  return anchor
    .substring(8)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>

<template>
  <div class="docs-components-page page">
    <MainContentPart ref="scroll">
      <template #aside>
        <ComponentsList />
      </template>
      <template #default>
        <section ref="componentPage">
          <NuxtPage />
        </section>
      </template>
      <template #aside-right>
        <h3 class="nmorph-title-3 docs-components-page__title">
          {{ $t("right-aside-title") }}
        </h3>
        <nav class="docs-components-page__nav">
          <ul>
            <li
              v-for="anchor in navigationContents"
              :key="anchor"
              :class="{
                'docs-components-page--active': anchor === activeAnchor,
              }"
            >
              <a :href="`#${anchor}`">{{ linkName(anchor) }}</a>
            </li>
          </ul>
        </nav>
      </template>
    </MainContentPart>
  </div>
</template>

<style lang="scss">
.docs-components-page__nav {
  li {
    text-align: center;
    margin-bottom: 8px;
  }
}
.docs-components-page__title {
  text-align: center;
}

.docs-components-page--active {
  font-weight: 800;
}
</style>
