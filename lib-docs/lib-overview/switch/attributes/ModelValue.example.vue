<script setup lang="ts">
import { NmorphSwitch } from "@nmorph/nmorph-ui-kit";

const firstSwitch = ref(false);
const secondSwitch = ref("off");
const thirdSwitch = ref(1);
</script>

<template>
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
        <NmorphSwitch
          v-model="secondSwitch"
          active-value="on"
          inactive-value="off"
        />
      </div>
      <div class="switch-el">
        <p class="switch-value nmorph-title-3">
          {{ $t("overview.value") }} {{ thirdSwitch }}
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
