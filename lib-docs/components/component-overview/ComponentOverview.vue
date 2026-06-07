<script setup lang="ts">
import { nextTick, shallowRef } from "vue";
import { pascalToSpace, anyToPascalCase } from "~/utils";
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
import mediaTileOverview from "~/lib-overview/media-tile";
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
}
const props = withDefaults(defineProps<IProps>(), {});

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
  "media-tile": mediaTileOverview,
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
  "guide-step": guideOverview,
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
  overviewComponents.value = overviewComponentsByName[props.name] ?? [];
  await nextTick();
  doUpdate();
};

watch(() => props.name, loadOverview, { immediate: true });
</script>

<template>
  <div class="nmorph-docs-content">
    <MainContentPart ref="scrollDOMRef" left-aside-scroll-key="components-list">
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
}

.component-overview__title {
  margin-bottom: var(--docs-content-padding);
}
</style>
