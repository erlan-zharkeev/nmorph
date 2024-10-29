<script setup lang="ts">
import { NmorphSwitch } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script setup="ts">
const firstSwitch = ref(false);
const secondSwitch = ref("off");
const thirdSwitch = ref(1);
<\/script>
`;
const templateData = "";
const cssData = `
<template>
  <div class="switch-model-value-overview">
    <ClientOnly>
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
    </ClientOnly>
  </div>
</template>
`;
const code = [scriptData, templateData, cssData];

const firstSwitch = ref(false);
const secondSwitch = ref("off");
const thirdSwitch = ref(1);
</script>

<template>
  <div id="content-model-value">
    <attribute
      header="Model-value"
      :subtitle="$t('overview.switch.model-value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="switch-model-value-overview">
          <ClientOnly>
            <div class="switch-el">
              <p class="switch-value nmorph-title-3">
                value: {{ firstSwitch }}
              </p>
              <NmorphSwitch v-model="firstSwitch" />
            </div>
            <div class="switch-el">
              <p class="switch-value nmorph-title-3">
                value: {{ secondSwitch }}
              </p>
              <NmorphSwitch
                v-model="secondSwitch"
                active-value="on"
                inactive-value="off"
              />
            </div>
            <div class="switch-el">
              <p class="switch-value nmorph-title-3">
                value: {{ thirdSwitch }}
              </p>
              <NmorphSwitch
                v-model="thirdSwitch"
                :active-value="1"
                :inactive-value="0"
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
