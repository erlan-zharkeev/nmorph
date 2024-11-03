<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

const scriptData = `
<script lang="ts" setup>
  const value = ref("one");
  const options = ref([
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
  ]);
  const multipleValue = ["one", "two"];
<\/script>
`;
const templateData = `
<template>
  <div class="select-element">
    <NmorphSelect v-model="value" :options="options" />
  </div>
  <div class="select-element">
    <NmorphSelect
      v-model="multipleValue"
      :options="options"
      :no-element-placeholder="
        Choose values
      "
    />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .select-model-value-overview {
    display: flex;
    .nmorph-select {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const value = ref("one");
const options = ref([
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two") },
  { value: "three", label: t("overview.three") },
]);
const multipleValue = ["one", "two"];
</script>

<template>
  <div id="content-model-value">
    <attribute
      header="Model-value"
      :subtitle="$t('overview.select.model-value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="select-model-value-overview">
          <ClientOnly>
            <div class="select-element">
              <NmorphSelect v-model="value" :options="options" />
            </div>
            <div class="select-element">
              <NmorphSelect
                v-model="multipleValue"
                :options="options"
                :no-element-placeholder="
                  $t('overview.select.model-value.multiple')
                "
              />
            </div>
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
.select-model-value-overview {
  display: flex;
  .nmorph-select {
    margin-right: 8px;
  }
}
</style>
