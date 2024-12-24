<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import CatReal from "~/assets/images/cat-real.png";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphAvatar
    :src="CatReal"
    :size="100"
    shape="square"
    fit="cover"
  />
  <NmorphAvatar
    :src="CatReal"
    :size="100"
    shape="square"
    fit="contain"
  />
  <NmorphAvatar
    :src="CatReal"
    :size="100"
    shape="square"
    fit="fill"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .avatar-fit-overview {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .nmorph-avatar {
      margin: 0 12px;
    }

    .nmorph-avatar:last-child {
      margin-top: 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-fit">
    <Attribute header="Fit" :subtitle="$t('overview.avatar.fit.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="avatar-fit-overview">
          <ClientOnly>
            <NmorphAvatar :src="CatReal" :size="100" shape="square" fit="cover" />
            <NmorphAvatar :src="CatReal" :size="100" shape="square" fit="contain" />
            <NmorphAvatar :src="CatReal" :size="100" shape="square" fit="fill" />
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
.avatar-fit-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-avatar {
    margin: 0 12px;
  }

  .nmorph-avatar:last-child {
    margin-top: 8px;
  }
}
</style>
