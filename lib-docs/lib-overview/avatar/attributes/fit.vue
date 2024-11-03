<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import CatReal from "~/assets/images/cat-real.png";

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
    .nmorph-avatar {
      margin-right: 12px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-fit">
    <attribute
      header="Fit"
      :subtitle="$t('overview.avatar.fit.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="avatar-fit-overview">
          <ClientOnly>
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
.avatar-fit-overview {
  display: flex;
  align-items: center;
  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
