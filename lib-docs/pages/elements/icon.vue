<script setup lang="ts">
import { computed, onMounted, reactive, shallowRef, type Component } from "vue";
import { notificationProvider } from "~/providers";
import { pascalToSpace } from "~/utils";

import {
  NmorphForm,
  NmorphFormItem,
  NmorphTextInput,
  NmorphIcon,
} from "@nmorph/nmorph-ui-kit";

const iconList = shallowRef<Record<string, Component>>({});

onMounted(async () => {
  const icons = await import("@nmorph/nmorph-ui-kit/icons");
  iconList.value = Object.fromEntries(
    Object.entries(icons).filter(([name]) => name.startsWith("NmorphIcon") && name !== "NmorphIcon")
  ) as Record<string, Component>;
});

const form = reactive({
  searchText: {
    value: "",
    rules: [],
  },
});

const filteredIconNames = computed(() => {
  const searchText = form.searchText.value.trim().toLowerCase();
  const iconNames = Object.keys(iconList.value);
  if (!searchText) return iconNames;
  return iconNames.filter((iconName) => {
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
  <ComponentOverview name="icon">
    <template #default>
      <div class="docs-icon" id="content-icon-list">
        <NmorphForm :value="form" class="docs-icon__search-icon-form">
          <NmorphFormItem id="searchText" class="docs-icon__search-field">
            <NmorphTextInput :placeholder="$t('overview.icon.search-icon')" v-model="form.searchText.value" />
          </NmorphFormItem>
        </NmorphForm>
        <div class="docs-icon__list-content nmorph--shadow-outset" v-if="filteredIconNames.length">
          <div class="docs-icon__list-el nmorph--shadow-outset" v-for="(el, idx) in filteredIconNames" :key="idx"
            @click="() => clickIconHandler(String(el))">
            <ClientOnly>
              <NmorphIcon size="medium">
                <component :is="iconList[String(el)]" />
              </NmorphIcon>
            </ClientOnly>
            <span class="docs-icon__icon-name">{{
              pascalToSpace(el.slice(10)).toLowerCase()
              }}</span>
          </div>
        </div>
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
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 8px;
    margin: 20px 0;
    padding: 8px;
  }

  @include max-width-query(768) {
    .docs-icon__list-content {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @include max-width-query(768) {
    .docs-icon__list-content {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @include max-width-query(500) {
    .docs-icon__list-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @include max-width-query(360) {
    .docs-icon__list-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .docs-icon__list-el {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
    text-align: center;
    height: 80px;
    cursor: pointer;
  }

  .docs-icon__icon-name {
    margin-top: 4px;
  }
}
</style>
