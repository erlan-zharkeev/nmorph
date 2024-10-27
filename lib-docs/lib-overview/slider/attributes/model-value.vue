
<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-model-value">
    <attribute
      header="Model-value"
      :subtitle="$t('overview.slider.model-value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="slider-model-value-overview">
          <ClientOnly>
            <NmorphSlider />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{ templateData }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{ scriptData }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.slider-model-value-overview {}
</style>
