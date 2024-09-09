<script setup lang="ts">
import {
  NmorphForm,
  NmorphFormItem,
  NmorphIconList,
  NmorphTextInput,
  NmorphIcon,
} from "@nmorph/nmorph-ui-kit";
import { reactive } from "vue";
import { notificationProvider } from "~/providers";

const form = reactive({
  searchText: {
    value: "",
    rules: [],
  },
});

const clickIconHandler = (iconName: string) => {
  const value = `<NmorphIcon name="${iconName}" />`;
  navigator.clipboard.writeText(value);
  notificationProvider.notify({
    content: `Copied`,
    duration: 2000,
    type: "success",
    width: "fit-content",
    closable: false,
    bordered: false,
  });
};

const iconList = computed(() => {
  if (!form.searchText.value) {
    return NmorphIconList;
  }
  return Object.keys(NmorphIconList).filter((el) =>
    el.toLowerCase().includes(form.searchText.value.toLowerCase())
  );
});
</script>

<template>
  <ComponentOverview name="icon">
    <template #default>
      <div class="docs-icon" id="content-icon-list">
        <NmorphForm :value="form" class="docs-icon__search-icon-form">
          <NmorphFormItem id="searchText" class="docs-icon__search-field">
            <NmorphTextInput
              :placeholder="$t('overview.icon.search-icon')"
              v-model="form.searchText.value"
            />
          </NmorphFormItem>
        </NmorphForm>
        <div
          class="docs-icon__list-content nmorph-outset"
          v-if="Object.keys(iconList).length"
        >
          <div
            class="docs-icon__list-el nmorph-outset"
            v-for="(el, idx) in iconList"
            :key="idx"
            @click="() => clickIconHandler(String(el))"
          >
            <ClientOnly>
              <NmorphIcon
                :name="(el as keyof typeof NmorphIconList)"
                size="medium"
              />
            </ClientOnly>
            <span class="docs-icon__icon-name">{{ el }}</span>
          </div>
        </div>
      </div>
    </template>
  </ComponentOverview>
</template>

<style lang="scss">
// TODO удалить после добавления в либу
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

// TODO удалить после добавления в либу
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
</style>
