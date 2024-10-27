<script setup lang="ts">
import { anyToPascalCase, pascalToSpace } from "@nmorph/nmorph-ui-kit";
import button from "~/lib-overview/button";
import icon from "~/lib-overview/icon";
import link from "~/lib-overview/link";
import scroll from "~/lib-overview/scroll";
import avatar from "~/lib-overview/avatar";
import badge from "~/lib-overview/badge";
import card from "~/lib-overview/card";
import image from "~/lib-overview/image";
import tag from "~/lib-overview/tag";
import skeleton from "~/lib-overview/skeleton";
import progress from "~/lib-overview/progress";
import calendar from "~/lib-overview/calendar";
import imagePreview from "~/lib-overview/image-preview";
import pagination from "~/lib-overview/pagination";
import table from "~/lib-overview/table";
import tooltip from "~/lib-overview/tooltip";
import alert from "~/lib-overview/alert";
import dialog from "~/lib-overview/dialog";
import divider from "~/lib-overview/divider";
import overlay from "~/lib-overview/overlay";
import notificationProvider from "~/lib-overview/notification-provider";
import tabs from "~/lib-overview/tabs";
import dropdown from "~/lib-overview/dropdown";
import backtop from "~/lib-overview/backtop";
import breadcrumb from "~/lib-overview/breadcrumb";
import textInput from "~/lib-overview/text-input";
import switchInput from "~/lib-overview/switch";
import checkbox from "~/lib-overview/checkbox";
import checkboxGroup from "~/lib-overview/checkbox-group";
import autocomplete from "~/lib-overview/autocomplete";
import fileUpload from "~/lib-overview/file-upload";
import numberInput from "~/lib-overview/number-input";
import select from "~/lib-overview/select";
import slider from "~/lib-overview/slider";
import timePicker from "~/lib-overview/time-picker";
import radio from "~/lib-overview/radio";
import radioGroup from "~/lib-overview/radio-group";
import form from "~/lib-overview/form";

interface IProps {
  name: string;
}
const props = withDefaults(defineProps<IProps>(), {});

const componentsMap: Record<string, unknown[]> = {
  button,
  icon,
  link,
  scroll,
  avatar,
  badge,
  card,
  image,
  tag,
  skeleton,
  progress,
  calendar,
  "image-preview": imagePreview,
  pagination,
  table,
  tooltip,
  alert,
  dialog,
  divider,
  overlay,
  "notification-provider": notificationProvider,
  tabs,
  dropdown,
  backtop,
  breadcrumb,
  "text-input": textInput,
  switch: switchInput,
  checkbox,
  "checkbox-group": checkboxGroup,
  autocomplete,
  "file-upload": fileUpload,
  "number-input": numberInput,
  select,
  slider,
  "time-picker": timePicker,
  radio,
  "radio-group": radioGroup,
  form,
};
</script>

<template>
  <div class="component-overview">
    <div class="component-overview__title nmorph-title-1">
      {{ pascalToSpace(anyToPascalCase(props.name)) }}
    </div>
    <slot />
    <div v-for="(el, idx) in componentsMap[props.name]" :key="idx">
      <component :is="el" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-overview {
  width: 100%;
  padding: 16px;
}

.component-overview__title {
  margin-bottom: 8px;
}
</style>
