<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Dog, Racoon } from "~/assets/images";

const scriptData = ``;

const templateData = `
<NmorphAvatar :src="./bear.jpg" :size="70" shape="square" />
<NmorphAvatar :src="./cat.jpg" :size="70" shape="circle" />
`;

const cssData = ``;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-shape">
    <attribute
      header="Shape"
      :subtitle="$t('overview.avatar.shape.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="avatar-shape-overview">
          <ClientOnly>
            <NmorphAvatar :src="Dog" :size="70" shape="square" />
            <NmorphAvatar :src="Racoon" :size="70" shape="circle" />
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
.avatar-shape-overview {
  display: flex;
  align-items: center;
  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
