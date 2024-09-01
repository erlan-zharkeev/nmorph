
<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";

const list: {
  name: string;
  components: string[];
}[] =  [
  {
    name: "basic",
    components: ["NmorphButton", "NmorphIcon", "NmorphLink", "NmorphScroll"],
  },
  // {
  //   name: "data",
  //   components: [
  //     "NmorphAvatar",
  //     "NmorphBadge",
  //     "NmorphCalendar",
  //     "NmorphCalendarHeader",
  //     "NmorphCard",
  //     "NmorphCarousel",
  //     "NmorphCarouselItem",
  //     "NmorphCollapse",
  //     "NmorphCollapseItem",
  //     "NmorphImage",
  //     "NmorphImagePreview",
  //     "NmorphPagination",
  //     "NmorphProgress",
  //     "NmorphSkeleton",
  //     "NmorphSkeletonItem",
  //     "NmorphTable",
  //     "NmorphTableCell",
  //     "NmorphTableColumn",
  //     "NmorphTag",
  //   ],
  // },
  // {
  //   name: "feedback",
  //   components: ["NmorphAlert", "NmorphDialog", "NmorphTooltip"],
  // },
  // {
  //   name: "form",
  //   components: [
  //     "NmorphCheckbox",
  //     "NmorphCheckboxGroup",
  //     "NmorphAutocomplete",
  //     "NmorphDatePicker",
  //     "NmorphDatePickerContent",
  //     "NmorphDatePickerHeader",
  //     "NmorphYearMonthPicker",
  //     "NmorphFileUpload",
  //     "NmorphForm",
  //     "NmorphFormItem",
  //     "NmorphNumberInput",
  //     "NmorphSelect",
  //     "NmorphSelectOption",
  //     "NmorphSlider",
  //     "NmorphSwitch",
  //     "NmorphTextInput",
  //     "NmorphTimePicker",
  //     "NmorphRadio",
  //     "NmorphRadioGroup",
  //   ],
  // },
  // {
  //   name: "navigation",
  //   components: [
  //     "NmorphBacktop",
  //     "NmorphBreadcrumb",
  //     "NmorphBreadcrumbItem",
  //     "NmorphDropdown",
  //     "NmorphTabs",
  //     "NmorphTabPane",
  //   ],
  // },
  // {
  //   name: "others",
  //   components: ["NmorphDivider", "NmorphOverlay"],
  // },
];

const localePath = useLocalePath();
const router = useRouter();
const isRouteExist = (name: string) =>
  router.resolve(componentPathByName(name)).matched.length > 0;
</script>

<template>
  <div class="docs-component-list">
    <NmorphScroll class="docs-component-list__scroll">
      <div
        class="docs-component-list__element"
        v-for="category in list"
        :key="category.name"
      >
        <div class="docs-component-list__element-title nmorph-title-1">
          {{ category.name }}
        </div>
        <div
          class="docs-component-list__element-name nmorph-body-1"
          v-for="componentName in category.components"
          :key="componentName"
        >
          <div v-if="isRouteExist(componentName)">
            <NuxtLink :to="localePath(componentPathByName(componentName))">
              {{ componentName.substring(6) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-component-list__element-title {
  text-transform: capitalize;
}

.docs-component-list__element-name {
  padding-left: 16px;
  padding: 4px 4px 4px 16px;
  cursor: pointer;
  a {
    &.router-link-exact-active {
      font-weight: 800;
    }
  }
}

.docs-component-list__scroll {
  height: var(--aside-container-height);
}
</style>
