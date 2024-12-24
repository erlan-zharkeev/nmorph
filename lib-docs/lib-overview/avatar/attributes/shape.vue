<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Dog, Racoon } from "~/assets/images";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphAvatar :src="./bear.jpg" :size="70" shape="square" />
  <NmorphAvatar :src="./cat.jpg" :size="70" shape="circle" />
</template>
`;

const cssData = `
<style lang="scss">
  .avatar-shape-overview {
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
  <div id="content-shape">
    <Attribute header="Shape" :subtitle="$t('overview.avatar.shape.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="avatar-shape-overview">
          <ClientOnly>
            <NmorphAvatar :src="Dog" :size="70" shape="square" />
            <NmorphAvatar :src="Racoon" :size="70" shape="circle" />
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
.avatar-shape-overview {
  display: flex;
  align-items: center;

  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
