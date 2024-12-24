<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Cat, Dog, Racoon } from "~/assets/images";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphAvatar :src="./bear.jpg" :size="70" />
  <NmorphAvatar :src="./cat.jpg" :size="50" />
  <NmorphAvatar :src="./fox.jpg" :size="40" />
</template>
`;
const cssData = `
<style lang="scss">
  .avatar-size-overview {
    display: flex;
    align-items: center;
    .nmorph-avatar {
      margin-right: 12px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-size">
    <Attribute header="Size" :subtitle="$t('overview.avatar.size.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="avatar-size-overview">
          <ClientOnly>
            <NmorphAvatar :src="Dog" :size="70" />
            <NmorphAvatar :src="Cat" :size="50" />
            <NmorphAvatar :src="Racoon" :size="40" />
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
.avatar-size-overview {
  display: flex;
  align-items: center;

  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
