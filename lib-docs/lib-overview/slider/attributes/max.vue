
<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-max">
    <attribute
      header="Max"
      :subtitle="$t('overview.slider.max.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="slider-max-overview">
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
.slider-max-overview {}
</style>
