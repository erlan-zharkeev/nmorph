<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Autumn, Spring, Summer, Winter } from "~/assets/images";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
import { Autumn, Spring, Summer, Winter } from "~/assets/images";
`;

const templateData = `
<template>
  <NmorphAvatar
    :src="[Summer, Spring, Winter, Autumn]"
    preview
    :size="80"
    shape="square"
    :preview-initial-index="1"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .avatar-preview-overview {
    display: flex;
    align-items: center;
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-preview">
    <Attribute header="Preview" :subtitle="$t('overview.avatar.preview.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="avatar-preview-overview">
          <ClientOnly>
            <NmorphAvatar
              :src="[Summer, Spring, Winter, Autumn]"
              preview
              :size="80"
              shape="square"
              :preview-initial-index="1"
            />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.avatar-preview-overview {
  display: flex;
  align-items: center;
}
</style>
