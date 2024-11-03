<script setup lang="ts">
import { NmorphRadioGroup } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

const scriptData = `
<script lang="ts" setup>
  const options = [
    { value: "one", label: "One" },
    { value: "two", label: "Two", disabled: true },
    { value: "three", label: "Three" },
  ];
  const value = ref("three");
<\/script>
`;

const templateData = `
<template>
  <div class="radio-group-el">
    <NmorphRadioGroup :options="options" v-model="value" />
  </div>
  <div class="radio-group-el">
    <NmorphRadioGroup
      :options="options"
      v-model="value"
      direction="column"
      style-type="radio-style"
    />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .radio-group-model-value-overview {
    .radio-group-el {
      margin-bottom: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const options = [
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two"), disabled: true },
  { value: "three", label: t("overview.three") },
];
const value = ref("three");
</script>

<template>
  <div id="content-model-value">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="radio-group-model-value-overview">
          <ClientOnly>
            <div class="radio-group-el">
              <NmorphRadioGroup :options="options" v-model="value" />
            </div>
            <div class="radio-group-el">
              <NmorphRadioGroup
                :options="options"
                v-model="value"
                direction="column"
                style-type="radio-style"
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
.radio-group-model-value-overview {
  .radio-group-el {
    margin-bottom: 8px;
  }
}
</style>
