<script setup lang="ts">
import { NmorphDialog } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const dialogVisibility = ref(false);

  const showModalHandler = () => {
    dialogVisibility.value = true;
  };
<\/script>
`;

const templateData = `
<template>
  <NmorphButton
    @click="showModalHandler"
    :text="$t('overview.dialog.basic-usage.show-modal')"
  />
  <NmorphDialog
    v-model="dialogVisibility"
    title="Lorem Ipsum"
    :close-on-click-modal="false"
    width="320px"
  >
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text
    ever since the 1500s, when an unknown printer took a galley of
    type and scrambled it to make a type specimen book. It has
    survived not only five centuries, but also the leap into
    electronic typesetting, remaining essentially unchanged. It was
    popularised in the 1960s with the release of Letraset sheets
    containing Lorem Ipsum passages, and more recently with desktop
    publishing software like Aldus PageMaker including versions of
    Lorem Ipsum.
  </NmorphDialog>
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const dialogVisibility = ref(false);

const showModalHandler = () => {
  dialogVisibility.value = true;
};
</script>

<template>
  <div id="content-basic-usage">
    <attribute
      :header="$t('overview.basic-usage')"
      :subtitle="$t('overview.dialog.basic-usage.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="dialog-basic-usage-overview">
          <ClientOnly>
            <NmorphButton
              @click="showModalHandler"
              :text="$t('overview.dialog.basic-usage.show-modal')"
            />
            <NmorphDialog
              v-model="dialogVisibility"
              title="Lorem Ipsum"
              :close-on-click-modal="false"
              width="320px"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </NmorphDialog>
          </ClientOnly>
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
.dialog-basic-usage-overview {
}
</style>
