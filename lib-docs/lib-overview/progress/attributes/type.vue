<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphProgress :percentage="50" color="var(--nmorph-accent-color)" />
  <NmorphProgress
    type="circle"
    :percentage="50"
    class="circle-progress"
    color="pink"
  />
</template>
`;

const cssData = `
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
            <NmorphProgress
              :percentage="50"
              color="var(--nmorph-accent-color)"
            />
            <NmorphProgress
              type="circle"
              :percentage="50"
              class="circle-progress"
              color="pink"
            />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
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
