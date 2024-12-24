<script setup lang="ts">
import { NmorphSwitch } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const firstSwitch = ref(false);
  const secondSwitch = ref("off");
  const thirdSwitch = ref(1);
<\/script>
`;
const templateData = `
<template>
  <div class="switch-model-value-overview">
    <div class="switch-el">
      <p class="switch-value nmorph-title-3">
        First switch value: {{ firstSwitch }}
      </p>
      <NmorphSwitch v-model="firstSwitch" />
    </div>
    <div class="switch-el">
      <p class="switch-value nmorph-title-3">
        Second switch value: {{ secondSwitch }}
      </p>
      <NmorphSwitch
        v-model="secondSwitch"
        active-value="on"
        inactive-value="off"
      />
    </div>
    <div class="switch-el">
      <p class="switch-value nmorph-title-3">
        Third switch value: {{ thirdSwitch }}
      </p>
      <NmorphSwitch
        v-model="thirdSwitch"
        :active-value="1"
        :inactive-value="0"
      />
    </div>
  </div>
</template>
`;
const cssData = `
<style lang="scss">
  .switch-model-value-overview {
    display: flex;
    .switch-el {
      margin-right: 8px;
    }
    .switch-value {
      margin-bottom: 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];

const firstSwitch = ref(false);
const secondSwitch = ref("off");
const thirdSwitch = ref(1);
</script>

<template>
  <div id="content-model-value">
    <Attribute header="Model-value" :subtitle="$t('overview.switch.model-value.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="switch-model-value-overview">
          <ClientOnly>
            <div class="switch-el">
              <p class="switch-value nmorph-title-3">
                {{ $t("overview.value") }} {{ firstSwitch }}
              </p>
              <NmorphSwitch v-model="firstSwitch" />
            </div>
            <div class="switch-el">
              <p class="switch-value nmorph-title-3">
                {{ $t("overview.value") }} {{ secondSwitch }}
              </p>
              <NmorphSwitch v-model="secondSwitch" active-value="on" inactive-value="off" />
            </div>
            <div class="switch-el">
              <p class="switch-value nmorph-title-3">
                {{ $t("overview.value") }} {{ thirdSwitch }}
              </p>
              <NmorphSwitch v-model="thirdSwitch" :active-value="1" :inactive-value="0" />
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.switch-model-value-overview {
  display: flex;

  .switch-el {
    margin-right: 8px;
  }

  .switch-value {
    margin-bottom: 8px;
  }
}
</style>
