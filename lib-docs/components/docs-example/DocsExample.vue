<script setup lang="ts">
import type { Component } from "vue";
import type { NmorphCalloutType } from "@nmorph/nmorph-ui-kit";
import Attribute from "~/components/attribute/Attribute.vue";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";
import { splitVueSource } from "~/utils";

const props = defineProps<{
  component: Component;
  source: string;
  header: string;
  infoName?: string;
  infoType?: NmorphCalloutType;
  subtitle?: string;
}>();

const sourceParts = computed(() => splitVueSource(props.source));
const code = computed(() =>
  sourceParts.value.blocks.map((block) => block.source),
);
</script>

<template>
  <Attribute
    :header="props.header"
    :info-name="props.infoName"
    :info-type="props.infoType"
    :subtitle="props.subtitle"
    :code-to-copy="code"
  >
    <template #overview>
      <component :is="props.component" />
    </template>
    <template #code>
      <CodeSlotData
        :blocks="sourceParts.blocks"
        :template-data="sourceParts.templateData"
        :script-data="sourceParts.scriptData"
        :css-data="sourceParts.cssData"
      />
    </template>
  </Attribute>
</template>
