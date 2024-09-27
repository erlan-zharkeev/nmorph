<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<NmorphProgress :percentage="50" />
<NmorphProgress
  type="circle"
  :percentage="50"
  class="circle-progress"
/>
`;

const cssData = `
.progress-type-overview {
  width: 100%;
  display: flex;
  align-items: center;

  .nmorph-progress {
    width: 50%;
  }
  .circle-progress {
    display: flex;
    justify-content: center;
  }
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-type">
    <attribute
      header="Type"
      :subtitle="$t('overview.progress.type.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="progress-type-overview">
          <ClientOnly>
            <NmorphProgress :percentage="50" />
            <NmorphProgress
              type="circle"
              :percentage="50"
              class="circle-progress"
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
.progress-type-overview {
  width: 100%;
  display: flex;
  align-items: center;

  .nmorph-progress {
    width: 50%;
  }
  .circle-progress {
    display: flex;
    justify-content: center;
  }
}
</style>
