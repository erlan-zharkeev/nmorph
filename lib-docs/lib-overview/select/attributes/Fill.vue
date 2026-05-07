<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
const value = ref("review");

const options = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "published", label: "Published" },
];
<\/script>
`;

const templateData = `
<template>
  <NmorphSelect v-model="value" :options="options" fill />
</template>
`;

const cssData = ``;
const code = [scriptData, templateData, cssData];

const value = ref("review");
const options = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "published", label: "Published" },
];
</script>

<template>
  <div id="content-fill">
    <Attribute header="Fill" :subtitle="$t('overview.select.fill.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-fill-overview">
          <ClientOnly>
            <NmorphSelect v-model="value" :options="options" fill />
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
.select-fill-overview {
  width: 100%;
}
</style>
