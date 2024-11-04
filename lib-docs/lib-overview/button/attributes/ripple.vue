<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphButton style-type="default" ripple text="I am ripple" />
  <NmorphButton
    style-type="default"
    ripple
    accent-bg-on-hover
    text="I am ripple with hover bg"
  />
  <NmorphButton :ripple="false" text="I am not ripple" />
</template>
`;
const cssData = `
<style lang="scss">
  .button-ripple-overview {
    .nmorph-button {
      margin: 0 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-ripple">
    <attribute
      header="Ripple"
      :subtitle="$t('overview.button.ripple.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-ripple-overview">
          <NmorphButton
            style-type="default"
            ripple
            :text="$t('overview.i-am-ripple')"
          />
          <NmorphButton
            style-type="default"
            ripple
            accent-bg-on-hover
            :text="$t('overview.i-am-ripple-with-hover-bg')"
          />
          <NmorphButton
            :ripple="false"
            :text="$t('overview.i-am-not-ripple')"
          />
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
.button-ripple-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
