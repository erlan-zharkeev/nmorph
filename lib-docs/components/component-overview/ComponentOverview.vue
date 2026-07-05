<script setup lang="ts">
import { nextTick, provide, shallowRef } from "vue";
import {
  NmorphIcon,
  NmorphIconArrowLeft,
  NmorphIconArrowRight,
} from "@nmorph/nmorph-ui-kit";
import { componentGroups } from "~/data/components";
import {
  anyToPascalCase,
  componentPathByName,
  docsNavigationKey,
  normalizeDocsAnchor,
  pascalToSpace,
} from "~/utils";
import MainContentPart from "~/layouts/MainContentPart.vue";
import ComponentsList from "~/components/component-list/ComponentList.vue";
import buttonOverview from "~/lib-overview/button";
import iconOverview from "~/lib-overview/icon";
import layoutOverview from "~/lib-overview/layout";
import linkOverview from "~/lib-overview/link";
import scrollOverview from "~/lib-overview/scroll";
import spaceOverview from "~/lib-overview/space";
import textOverview from "~/lib-overview/text";
import avatarOverview from "~/lib-overview/avatar";
import badgeOverview from "~/lib-overview/badge";
import audioMeterOverview from "~/lib-overview/audio-meter";
import audioPreviewOverview from "~/lib-overview/audio-preview";
import cardOverview from "~/lib-overview/card";
import emptyOverview from "~/lib-overview/empty";
import emojiPickerOverview from "~/lib-overview/emoji-picker";
import fileCardOverview from "~/lib-overview/file-card";
import imageOverview from "~/lib-overview/image";
import mediaGalleryOverview from "~/lib-overview/media-gallery";
import videoPreviewOverview from "~/lib-overview/video-preview";
import tagListOverview from "~/lib-overview/tag-list";
import tagItemOverview from "~/lib-overview/tag-item";
import carouselOverview from "~/lib-overview/carousel";
import collapseOverview from "~/lib-overview/collapse";
import skeletonOverview from "~/lib-overview/skeleton";
import progressOverview from "~/lib-overview/progress";
import qrCodeOverview from "~/lib-overview/qr-code";
import calendarOverview from "~/lib-overview/calendar";
import imagePreviewOverview from "~/lib-overview/image-preview";
import paginationOverview from "~/lib-overview/pagination";
import tableOverview from "~/lib-overview/table";
import virtualListOverview from "~/lib-overview/virtual-list";
import tooltipOverview from "~/lib-overview/tooltip";
import guideOverview from "~/lib-overview/guide";
import guideStepOverview from "~/lib-overview/guide-step";
import alertOverview from "~/lib-overview/alert";
import calloutOverview from "~/lib-overview/callout";
import dialogOverview from "~/lib-overview/dialog";
import drawerOverview from "~/lib-overview/drawer";
import dividerOverview from "~/lib-overview/divider";
import overlayOverview from "~/lib-overview/overlay";
import notificationProviderOverview from "~/lib-overview/notification-provider";
import tabsOverview from "~/lib-overview/tabs";
import stepperOverview from "~/lib-overview/stepper";
import dropdownOverview from "~/lib-overview/dropdown";
import contextMenuOverview from "~/lib-overview/context-menu";
import backtopOverview from "~/lib-overview/backtop";
import breadcrumbOverview from "~/lib-overview/breadcrumb";
import textInputOverview from "~/lib-overview/text-input";
import textareaOverview from "~/lib-overview/textarea";
import otpInputOverview from "~/lib-overview/otp-input";
import colorPickerOverview from "~/lib-overview/color-picker";
import numberInputOverview from "~/lib-overview/number-input";
import switchOverview from "~/lib-overview/switch";
import checkboxOverview from "~/lib-overview/checkbox";
import checkboxGroupOverview from "~/lib-overview/checkbox-group";
import autocompleteOverview from "~/lib-overview/autocomplete";
import fileUploadOverview from "~/lib-overview/file-upload";
import selectOverview from "~/lib-overview/select";
import sliderOverview from "~/lib-overview/slider";
import radioOverview from "~/lib-overview/radio";
import radioGroupOverview from "~/lib-overview/radio-group";
import selectButtonOverview from "~/lib-overview/select-button";
import formOverview from "~/lib-overview/form";
import datePickerOverview from "~/lib-overview/date-picker";
import timePickerOverview from "~/lib-overview/time-picker";

interface IProps {
  name: string;
  extraAnchors?: string[];
}
const props = withDefaults(defineProps<IProps>(), {
  extraAnchors: () => [],
});

const overviewComponentsByName: Record<string, unknown[]> = {
  button: buttonOverview,
  icon: iconOverview,
  layout: layoutOverview,
  link: linkOverview,
  scroll: scrollOverview,
  space: spaceOverview,
  text: textOverview,
  avatar: avatarOverview,
  badge: badgeOverview,
  "audio-meter": audioMeterOverview,
  "audio-preview": audioPreviewOverview,
  card: cardOverview,
  empty: emptyOverview,
  "emoji-picker": emojiPickerOverview,
  "file-card": fileCardOverview,
  image: imageOverview,
  "media-gallery": mediaGalleryOverview,
  "video-preview": videoPreviewOverview,
  "tag-list": tagListOverview,
  "tag-item": tagItemOverview,
  carousel: carouselOverview,
  collapse: collapseOverview,
  skeleton: skeletonOverview,
  progress: progressOverview,
  "qr-code": qrCodeOverview,
  calendar: calendarOverview,
  "image-preview": imagePreviewOverview,
  pagination: paginationOverview,
  table: tableOverview,
  "virtual-list": virtualListOverview,
  tooltip: tooltipOverview,
  guide: guideOverview,
  "guide-step": guideStepOverview,
  alert: alertOverview,
  callout: calloutOverview,
  dialog: dialogOverview,
  drawer: drawerOverview,
  divider: dividerOverview,
  overlay: overlayOverview,
  "notification-provider": notificationProviderOverview,
  tabs: tabsOverview,
  stepper: stepperOverview,
  dropdown: dropdownOverview,
  "context-menu": contextMenuOverview,
  backtop: backtopOverview,
  breadcrumb: breadcrumbOverview,
  "text-input": textInputOverview,
  textarea: textareaOverview,
  "otp-input": otpInputOverview,
  "color-picker": colorPickerOverview,
  "number-input": numberInputOverview,
  switch: switchOverview,
  checkbox: checkboxOverview,
  "checkbox-group": checkboxGroupOverview,
  autocomplete: autocompleteOverview,
  "file-upload": fileUploadOverview,
  select: selectOverview,
  slider: sliderOverview,
  radio: radioOverview,
  "radio-group": radioGroupOverview,
  "select-button": selectButtonOverview,
  form: formOverview,
  "date-picker": datePickerOverview,
  "time-picker": timePickerOverview,
};

const overviewComponents = shallowRef<unknown[]>([]);
const navigationContents = ref<string[]>([]);
const navigationAnchorSet = new Set<string>();
const timeoutScrollId = ref<ReturnType<typeof setTimeout> | null>(null);
const scrollDOMRef = ref<any>(null);
const router = useRouter();
const localePath = useLocalePath();
const activeAnchor = ref("");
const observer = ref<IntersectionObserver | null>(null);
const componentNames = componentGroups.flatMap((group) => group.components);
const currentComponentIndex = computed(() =>
  componentNames.findIndex((componentName) => componentPathByName(componentName).endsWith(`/${props.name}`))
);

const createSiblingComponent = (componentName: string | undefined) => {
  if (!componentName) return null;

  return {
    path: localePath(componentPathByName(componentName)),
    title: pascalToSpace(componentName.substring(6)),
  };
};

const previousComponent = computed(() => {
  if (currentComponentIndex.value <= 0) return null;

  return createSiblingComponent(componentNames[currentComponentIndex.value - 1]);
});

const nextComponent = computed(() => {
  if (currentComponentIndex.value < 0 || currentComponentIndex.value >= componentNames.length - 1) return null;

  return createSiblingComponent(componentNames[currentComponentIndex.value + 1]);
});

const registerAnchor = (anchor: string) => {
  const normalizedAnchor = normalizeDocsAnchor(anchor);

  if (!normalizedAnchor || navigationAnchorSet.has(normalizedAnchor)) return;

  navigationAnchorSet.add(normalizedAnchor);
  navigationContents.value = [...navigationContents.value, normalizedAnchor];
};

const resetAnchors = () => {
  navigationAnchorSet.clear();
  navigationContents.value = [];
  activeAnchor.value = "";
  props.extraAnchors.forEach(registerAnchor);
};

provide(docsNavigationKey, {
  anchors: navigationContents,
  registerAnchor,
  resetAnchors,
});

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
  observeNavigationAnchors();
  timeoutScrollId.value = setTimeout(() => {
    scrollToAnchor(router.currentRoute.value.hash.substring(1));
  }, 400);
});

onUnmounted(() => {
  if (timeoutScrollId.value !== null) clearTimeout(timeoutScrollId.value);
  if (observer.value) observer.value.disconnect();
  timeoutScrollId.value = null;
});

const observeNavigationAnchors = () => {
  if (!import.meta.client || !observer.value) return;
  observer.value?.disconnect();

  navigationContents.value.forEach((anchor) => {
    const element = document.getElementById(anchor);

    if (!element || !observer.value) return;

    observer.value.observe(element);
  });
};

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

const loadOverview = () => {
  resetAnchors();
  overviewComponents.value = overviewComponentsByName[props.name] ?? [];
};

watch(navigationContents, async () => {
  await nextTick();
  observeNavigationAnchors();
});

watch([() => props.name, () => props.extraAnchors], loadOverview, { immediate: true, deep: true });
</script>

<template>
  <div class="nmorph-docs-content">
    <MainContentPart ref="scrollDOMRef" left-aside-scroll-key="components-list">
      <template #aside>
        <ComponentsList />
      </template>
      <template #default>
        <section>
          <div class="component-overview">
            <div class="component-overview__title nmorph-title-1">
              {{ pascalToSpace(anyToPascalCase(props.name)) }}
            </div>
            <slot />
            <div v-for="(el, idx) in overviewComponents" :key="idx">
              <component :is="el" />
            </div>
            <nav
              v-if="previousComponent || nextComponent"
              class="component-overview__navigation"
              :aria-label="$t('component-navigation.aria-label')"
            >
              <NuxtLink
                v-if="previousComponent"
                :to="previousComponent.path"
                class="component-overview__navigation-link component-overview__navigation-link--previous"
              >
                <NmorphIcon width="20px">
                  <NmorphIconArrowLeft />
                </NmorphIcon>
                <span class="component-overview__navigation-text">
                  <span class="component-overview__navigation-label">
                    {{ $t("component-navigation.previous") }}
                  </span>
                  <span class="component-overview__navigation-name">
                    {{ previousComponent.title }}
                  </span>
                </span>
              </NuxtLink>
              <NuxtLink
                v-if="nextComponent"
                :to="nextComponent.path"
                class="component-overview__navigation-link component-overview__navigation-link--next"
              >
                <span class="component-overview__navigation-text">
                  <span class="component-overview__navigation-label">
                    {{ $t("component-navigation.next") }}
                  </span>
                  <span class="component-overview__navigation-name">
                    {{ nextComponent.title }}
                  </span>
                </span>
                <NmorphIcon width="20px">
                  <NmorphIconArrowRight />
                </NmorphIcon>
              </NuxtLink>
            </nav>
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
}

.component-overview__title {
  margin-bottom: var(--docs-content-padding);
}

.component-overview__navigation {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: clamp(32px, 6vw, 56px);
  margin-bottom: clamp(24px, 5vw, 48px);
  padding-top: var(--docs-content-padding);
  border-top: 1px solid color-mix(in srgb, var(--nmorph-text-color) 16%, transparent);
}

.component-overview__navigation-link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  min-height: 72px;
  padding: 14px 16px;
  border-radius: 8px;
  background: var(--nmorph-main-color);
  box-shadow: var(--nmorph-shadow-outset);
  color: var(--nmorph-text-color);

  :deep(.nmorph-icon) {
    flex: 0 0 auto;

    --nmorph-private-icon-color: currentColor;
  }
}

.component-overview__navigation-link--previous {
  grid-column: 1;
}

.component-overview__navigation-link--next {
  grid-column: 2;
  justify-content: flex-end;
  text-align: right;
}

.component-overview__navigation-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.component-overview__navigation-label {
  color: var(--nmorph-semi-contrast-text-color);
  font-size: var(--font-size-extra-small);
  line-height: 1;
}

.component-overview__navigation-name {
  overflow: hidden;
  font-weight: 700;
  line-height: var(--line-height-regular);
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .component-overview__navigation {
    grid-template-columns: 1fr;
  }

  .component-overview__navigation-link--previous,
  .component-overview__navigation-link--next {
    grid-column: 1;
  }
}
</style>
