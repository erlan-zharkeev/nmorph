<script setup lang="ts">
import { nextTick, shallowRef } from "vue";
import { pascalToSpace, anyToPascalCase } from "~/utils";
import MainContentPart from "~/layouts/MainContentPart.vue";
import ComponentsList from "~/components/component-list/ComponentList.vue";

interface IProps {
  name: string;
}
const props = withDefaults(defineProps<IProps>(), {});

type OverviewModule = { default: unknown[] };

const overviewLoaders: Record<string, () => Promise<OverviewModule>> = {
  button: () => import("~/lib-overview/button"),
  icon: () => import("~/lib-overview/icon"),
  link: () => import("~/lib-overview/link"),
  scroll: () => import("~/lib-overview/scroll"),
  avatar: () => import("~/lib-overview/avatar"),
  badge: () => import("~/lib-overview/badge"),
  card: () => import("~/lib-overview/card"),
  image: () => import("~/lib-overview/image"),
  tag: () => import("~/lib-overview/tag"),
  skeleton: () => import("~/lib-overview/skeleton"),
  progress: () => import("~/lib-overview/progress"),
  calendar: () => import("~/lib-overview/calendar"),
  "image-preview": () => import("~/lib-overview/image-preview"),
  pagination: () => import("~/lib-overview/pagination"),
  table: () => import("~/lib-overview/table"),
  tooltip: () => import("~/lib-overview/tooltip"),
  alert: () => import("~/lib-overview/alert"),
  callout: () => import("~/lib-overview/callout"),
  dialog: () => import("~/lib-overview/dialog"),
  divider: () => import("~/lib-overview/divider"),
  overlay: () => import("~/lib-overview/overlay"),
  "notification-provider": () => import("~/lib-overview/notification-provider"),
  tabs: () => import("~/lib-overview/tabs"),
  dropdown: () => import("~/lib-overview/dropdown"),
  "context-menu": () => import("~/lib-overview/context-menu"),
  backtop: () => import("~/lib-overview/backtop"),
  breadcrumb: () => import("~/lib-overview/breadcrumb"),
  "text-input": () => import("~/lib-overview/text-input"),
  "otp-input": () => import("~/lib-overview/otp-input"),
  "color-picker": () => import("~/lib-overview/color-picker"),
  "number-input": () => import("~/lib-overview/number-input"),
  switch: () => import("~/lib-overview/switch"),
  checkbox: () => import("~/lib-overview/checkbox"),
  "checkbox-group": () => import("~/lib-overview/checkbox-group"),
  autocomplete: () => import("~/lib-overview/autocomplete"),
  "file-upload": () => import("~/lib-overview/file-upload"),
  select: () => import("~/lib-overview/select"),
  slider: () => import("~/lib-overview/slider"),
  radio: () => import("~/lib-overview/radio"),
  "radio-group": () => import("~/lib-overview/radio-group"),
  "select-button": () => import("~/lib-overview/select-button"),
  form: () => import("~/lib-overview/form"),
  "date-picker": () => import("~/lib-overview/date-picker"),
};

const overviewComponents = shallowRef<unknown[]>([]);
const navigationContents = ref<string[]>([]);
const timeoutScrollId = ref<ReturnType<typeof setTimeout> | null>(null);
const scrollDOMRef = ref<any>(null);
const componentPage = ref<HTMLElement | null>(null);
const router = useRouter();

const scrollToAnchor = (anchor: string) => {
  if (typeof document === "undefined" || !scrollDOMRef.value || !anchor) return;
  const target = document.getElementById(anchor);
  const scroll = scrollDOMRef.value.scroll;
  const scrollContainer = scroll?.scrollDOMContainer;
  if (!target || !scrollContainer) return;

  const offsetFromCurrent = target.getBoundingClientRect().top;
  const y = offsetFromCurrent + scrollContainer.scrollTop;
  scroll.moveTo({ x: 0, y });
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
  timeoutScrollId.value = setTimeout(() => {
    scrollToAnchor(router.currentRoute.value.hash.substring(1));
  }, 400);
});

onUnmounted(() => {
  if (timeoutScrollId.value !== null) clearTimeout(timeoutScrollId.value);
  if (observer.value) observer.value.disconnect();
  timeoutScrollId.value = null
});

const doUpdate = () => {
  if (!componentPage.value) return;
  observer.value?.disconnect();
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

const loadOverview = async () => {
  const loader = overviewLoaders[props.name];
  overviewComponents.value = [];
  if (!loader) return;
  const module = await loader();
  overviewComponents.value = module.default;
  await nextTick();
  doUpdate();
};

watch(() => props.name, loadOverview, { immediate: true });
</script>

<template>
  <div class="nmorph-docs-content">
    <MainContentPart ref="scrollDOMRef">
      <template #aside>
        <ComponentsList />
      </template>
      <template #default>
        <section ref="componentPage">
          <div class="component-overview">
            <div class="component-overview__title nmorph-title-1">
              {{ pascalToSpace(anyToPascalCase(props.name)) }}
            </div>
            <slot />
            <div v-for="(el, idx) in overviewComponents" :key="idx">
              <component :is="el" />
            </div>
          </div>
        </section>
      </template>
      <template #aside-right>
        <h3 class="nmorph-title-3 docs-components-page__title">
          {{ $t("right-aside-title") }}
        </h3>
        <nav class="docs-components-page__nav">
          <ul>
            <li v-for="anchor in navigationContents" :key="anchor" :class="{
              'docs-components-page--active': anchor === activeAnchor,
            }">
              <a :href="`#${anchor}`">{{ linkName(anchor) }}</a>
            </li>
          </ul>
        </nav>
      </template>
    </MainContentPart>
  </div>
</template>

<style lang="scss" scoped>
.component-overview {
  width: 100%;
  padding: 16px;
}

@include max-width-query(768) {
  .component-overview {
    padding: 2px 4px 16px 4px;
  }
}

.component-overview__title {
  margin-bottom: 8px;
}
</style>
