<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import Bear from "~/assets/images/bear.webp";
import Fox from "~/assets/images/fox.webp";
import Cat from "~/assets/images/cat.webp";

const scriptData = ``;

const templateData = `
<NmorphAvatar :src="./bear.jpg" :size="70" />
<NmorphAvatar :src="./cat.jpg" :size="50" />
<NmorphAvatar :src="./fox.jpg" :size="40" />
`;

const cssData = ``;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-size">
    <attribute
      header="Size"
      :subtitle="$t('overview.avatar.size.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="avatar-size-overview">
          <ClientOnly>
            <NmorphAvatar :src="Bear" :size="70" />
            <NmorphAvatar :src="Cat" :size="50" />
            <NmorphAvatar :src="Fox" :size="40" />
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
.avatar-size-overview {
  display: flex;
  align-items: center;
  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
