<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const text = ref("");
  const list = ref([]);
  const actionCallback = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      const data = await response.json();
      list.value = data.map((el: unknown) => {
        const listEl = el as { title: string };
        return {
          value: listEl.title,
        };
      });
    } catch {
      list.value = [];
    }
  };
<\/script>
`;

const templateData = `
<template>
  <NmorphAutocomplete
    v-model="text"
    :list="list"
    :placeholder="$t('overview.autocomplete.basic-usage.placeholder')"
    :action-callback="actionCallback"
  />
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];

const text = ref("");
const list = ref([]);
const actionCallback = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );
    const data = await response.json();
    list.value = data.map((el: unknown) => {
      const listEl = el as { title: string };
      return {
        value: listEl.title,
      };
    });
  } catch {
    list.value = [];
  }
};
</script>

<template>
  <div id="content-action-callback">
    <attribute
      header="Action-callback"
      :subtitle="$t('overview.autocomplete.action-callback.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="autocomplete-action-callback-overview">
          <ClientOnly>
            <NmorphAutocomplete
              v-model="text"
              :list="list"
              :placeholder="$t('overview.autocomplete.basic-usage.placeholder')"
              :action-callback="actionCallback"
            />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.autocomplete-action-callback-overview {
}
</style>
