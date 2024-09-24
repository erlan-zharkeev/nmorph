<script setup lang="ts">
import { NmorphTag } from "@nmorph/nmorph-ui-kit";

const scriptData = `
const showTag1 = ref(true);
const showTag2 = ref(true);
`;

const templateData = `
<NmorphTag
  v-show="showTag1"
  value="1"
  text="tag one"
  removable
  @close="showTag1 = false"
/>
<NmorphTag
  v-show="showTag2"
  value="2"
  text="tag two"
  removable
  @close="showTag2 = false"
/>
`;

const cssData = "";

const showTag1 = ref(true);
const showTag2 = ref(true);

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-removable">
    <attribute
      header="Removable"
      :subtitle="$t('overview.tag.removable.subtitle')"
      info-name="tag.removable"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tag-removable-overview">
          <ClientOnly>
            <NmorphTag
              v-show="showTag1"
              value="1"
              text="tag one"
              removable
              @close="showTag1 = false"
            />
            <NmorphTag
              v-show="showTag2"
              value="2"
              text="tag two"
              removable
              @close="showTag2 = false"
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
.tag-removable-overview {
  .nmorph-tag {
    margin-right: 8px;
  }
}
</style>
