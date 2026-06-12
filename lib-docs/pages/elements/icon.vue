<script setup lang="ts">
import { computed, reactive } from "vue";
import { nmorphIconNames, nmorphIconRegistry } from "~/data/icon-registry";
import { notificationProvider } from "~/providers";
import { pascalToSpace } from "~/utils";

import {
  NmorphForm,
  NmorphFormItem,
  NmorphCard,
  NmorphTextInput,
  NmorphIcon,
} from "@nmorph/nmorph-ui-kit";

const form = reactive({
  searchText: {
    value: "",
    rules: [],
  },
});

const filteredIconNames = computed(() => {
  const searchText = form.searchText.value.trim().toLowerCase();
  if (!searchText) return nmorphIconNames;
  return nmorphIconNames.filter((iconName) => {
    const plainName = pascalToSpace(iconName.slice(10)).toLowerCase();
    return plainName.includes(searchText) || iconName.toLowerCase().includes(searchText);
  });
});

const copyToClipboard = async (value: string) => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const clickIconHandler = async (iconName: string) => {
  const value = `<NmorphIcon>
    <${iconName} />
  </NmorphIcon>`;
  try {
    await copyToClipboard(value);
    notificationProvider.notify({
      content: `Copied`,
      duration: 2000,
      type: "success",
      width: "fit-content",
      closable: false,
      bordered: false,
    });
  } catch {
    notificationProvider.notify({
      content: `Copy failed`,
      duration: 2000,
      type: "error",
      width: "fit-content",
      closable: false,
      bordered: false,
    });
  }
};
</script>

<template>
  <ComponentOverview name="icon" :extra-anchors="['content-icon-list']">
    <template #default>
      <div class="docs-icon" id="content-icon-list">
        <NmorphForm :value="form" class="docs-icon__search-icon-form">
          <NmorphFormItem id="searchText" class="docs-icon__search-field">
            <NmorphTextInput :placeholder="$t('overview.icon.search-icon')" v-model="form.searchText.value" />
          </NmorphFormItem>
        </NmorphForm>
        <NmorphCard
          v-if="filteredIconNames.length"
          class="docs-icon__list-content"
          content-class="docs-icon__list-content-grid"
          padding="8px"
          :paper="3"
        >
          <NmorphCard
            v-for="(el, idx) in filteredIconNames"
            :key="idx"
            class="docs-icon__list-el"
            content-class="docs-icon__list-el-content"
            padding="8px"
            :paper="3"
            @click="() => clickIconHandler(String(el))"
          >
            <NmorphIcon size="medium">
              <component :is="nmorphIconRegistry[String(el)]" />
            </NmorphIcon>
            <span class="docs-icon__icon-name">{{
              pascalToSpace(el.slice(10)).toLowerCase()
              }}</span>
          </NmorphCard>
        </NmorphCard>
      </div>
    </template>
  </ComponentOverview>
</template>

<style lang="scss">
.docs-icon {
  .nmorph-form-item .nmorph-form-item__content {
    display: block;
  }

  :deep(.docs-icon__search-field) {
    width: 100%;
  }

  :deep(.nmorph-form__content) {
    width: 100%;
    display: flex;
  }

  :deep(.nmorph-alert) {
    padding: 8px;
  }

  :deep(.nmorph-alert .nmorph-alert__icon) {
    margin-right: 4px;
  }

  :deep(.nmorph-validation-icon) {
    display: none;
  }

  .docs-icon__list-content {
    margin: 20px 0;
  }

  .docs-icon__list-content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
    grid-gap: 8px;
  }

  .docs-icon__list-el {
    box-sizing: border-box;
    min-width: 0;
    min-height: 88px;
    cursor: pointer;
  }

  .docs-icon__list-el-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .docs-icon__icon-name {
    max-width: 100%;
    margin-top: 4px;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }
}
</style>
