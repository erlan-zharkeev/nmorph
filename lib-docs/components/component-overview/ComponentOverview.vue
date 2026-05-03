<script setup lang="ts">
import { pascalToSpace, anyToPascalCase } from "~/utils";
import Button from "~/lib-overview/button";
import Icon from "~/lib-overview/icon";
import Link from "~/lib-overview/link";
import Scroll from "~/lib-overview/scroll";
import Avatar from "~/lib-overview/avatar";
import Badge from "~/lib-overview/badge";
import Card from "~/lib-overview/card";
import Image from "~/lib-overview/image";
import Tag from "~/lib-overview/tag";
import Skeleton from "~/lib-overview/skeleton";
import Progress from "~/lib-overview/progress";
import Calendar from "~/lib-overview/calendar";
import ImagePreview from "~/lib-overview/image-preview";
import Pagination from "~/lib-overview/pagination";
import Table from "~/lib-overview/table";
import Tooltip from "~/lib-overview/tooltip";
import Alert from "~/lib-overview/alert";
import Dialog from "~/lib-overview/dialog";
import Divider from "~/lib-overview/divider";
import Overlay from "~/lib-overview/overlay";
import NotificationProvider from "~/lib-overview/notification-provider";
import Tabs from "~/lib-overview/tabs";
import Dropdown from "~/lib-overview/dropdown";
import Backtop from "~/lib-overview/backtop";
import Breadcrumb from "~/lib-overview/breadcrumb";
import TextInput from "~/lib-overview/text-input";
import OtpInput from "~/lib-overview/otp-input";
import ColorPicker from "~/lib-overview/color-picker";
import NumberInput from "~/lib-overview/number-input";
import SwitchInput from "~/lib-overview/switch";
import Checkbox from "~/lib-overview/checkbox";
import CheckboxGroup from "~/lib-overview/checkbox-group";
import Autocomplete from "~/lib-overview/autocomplete";
import FileUpload from "~/lib-overview/file-upload";
import Select from "~/lib-overview/select";
import Slider from "~/lib-overview/slider";
import Radio from "~/lib-overview/radio";
import RadioGroup from "~/lib-overview/radio-group";
import SelectButton from "~/lib-overview/select-button";
import Form from "~/lib-overview/form";
import DatePicker from "~/lib-overview/date-picker";
import MainContentPart from "~/layouts/MainContentPart.vue";
import ComponentsList from "~/components/component-list/ComponentList.vue";

interface IProps {
  name: string;
}
const props = withDefaults(defineProps<IProps>(), {});

const componentsMap: Record<string, unknown[]> = {
  button: Button,
  icon: Icon,
  link: Link,
  scroll: Scroll,
  avatar: Avatar,
  badge: Badge,
  card: Card,
  image: Image,
  tag: Tag,
  skeleton: Skeleton,
  progress: Progress,
  calendar: Calendar,
  "image-preview": ImagePreview,
  pagination: Pagination,
  table: Table,
  tooltip: Tooltip,
  alert: Alert,
  dialog: Dialog,
  divider: Divider,
  overlay: Overlay,
  "notification-provider": NotificationProvider,
  tabs: Tabs,
  dropdown: Dropdown,
  backtop: Backtop,
  breadcrumb: Breadcrumb,
  "text-input": TextInput,
  "otp-input": OtpInput,
  "color-picker": ColorPicker,
  "number-input": NumberInput,
  switch: SwitchInput,
  checkbox: Checkbox,
  "checkbox-group": CheckboxGroup,
  autocomplete: Autocomplete,
  "file-upload": FileUpload,
  select: Select,
  slider: Slider,
  radio: Radio,
  "radio-group": RadioGroup,
  "select-button": SelectButton,
  form: Form,
  "date-picker": DatePicker,
};

const navigationContents = ref<string[]>([]);
const timeoutScrollId = ref(null);
const scrollDOMRef = ref(null);
const componentPage = ref<HTMLElement | null>(null);
const router = useRouter();

const scrollToAnchor = (anchor: string) => {
  if (document !== null || !scrollDOMRef.value || !anchor) return;
  const offsetFromCurrent = document
    // @ts-ignore ///
    .getElementById(anchor)
    .getBoundingClientRect().top;

  const y =
    // @ts-ignore ///
    offsetFromCurrent + scrollDOMRef.value.scroll.scrollDOMContainer.scrollTop;
  // @ts-ignore ///
  scrollDOMRef.value.scroll.moveTo({ x: 0, y });
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
  timeoutScrollId.value = null
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
            <div v-for="(el, idx) in componentsMap[props.name]" :key="idx">
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
