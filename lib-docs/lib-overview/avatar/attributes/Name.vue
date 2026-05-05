<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphAvatar name="John Doe" :size="70" />
  <NmorphAvatar name="Alex Smith" :size="50" />
</template>
`;
const cssData = `
<style lang="scss">
  .avatar-name-overview {
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
  <div id="content-name">
    <Attribute header="Name" :subtitle="$t('overview.avatar.name.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="avatar-name-overview">
          <ClientOnly>
            <NmorphAvatar name="John Doe" :size="70" />
            <NmorphAvatar name="Alex Smith" :size="50" />
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
.avatar-name-overview {
  display: flex;
  align-items: center;

  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
