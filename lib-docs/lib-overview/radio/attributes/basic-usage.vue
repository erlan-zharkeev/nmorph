<script setup lang="ts">
import { NmorphRadio } from "@nmorph/nmorph-ui-kit";

const scriptData = ``;
const templateData = `
<template>
  <NmorphRadio checked value="1" label="One" />
  <NmorphRadio value="2" label="Two" />
  <NmorphRadio
    value="3"
    checked
    style-type="radio-style"
    label="Three"
  />
  <NmorphRadio
    value="4"
    disabled
    checked
    style-type="radio-style"
    label="Four"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .radio-value-overview {
    display: flex;
    align-items: center;
    .nmorph-radio {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-value">
    <attribute
      :header="$t('overview.basic-usage')"
      info-name="radio.basic-usage"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="radio-value-overview">
          <ClientOnly>
            <NmorphRadio checked value="1" :label="$t('overview.one')" />
            <NmorphRadio value="2" :label="$t('overview.two')" />
            <NmorphRadio
              value="3"
              checked
              style-type="radio-style"
              :label="$t('overview.three')"
            />
            <NmorphRadio
              value="4"
              disabled
              checked
              style-type="radio-style"
              :label="$t('overview.four')"
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
.radio-value-overview {
  display: flex;
  align-items: center;
  .nmorph-radio {
    margin-right: 8px;
  }
}
</style>
