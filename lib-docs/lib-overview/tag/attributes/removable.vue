<script setup lang="ts">
import { NmorphTagItem, NmorphTagList } from "@nmorph/nmorph-ui-kit";
const showTag1 = ref(true);
const showTag2 = ref(true);
const list = ref([
  { value: "3", text: "I m tag 3 from list" },
  { value: "4", text: "I m tag 4 from list" },
  { value: "5", text: "I m tag 5 from list", removable: false },
]);

const scriptData = `
const showTag1 = ref(true);
const showTag2 = ref(true);
const list = ref([
  { value: "3", text: "I m tag 3 from list" },
  { value: "4", text: "I m tag 4 from list" },
  { value: "5", text: "I m tag 5 from list", removable: false },
]);
`;

const templateData = `
<NmorphTagItem
  v-show="showTag1"
  value="0"
  text="tag zero"
  :removable="false"
/>
<NmorphTagItem
  v-show="showTag1"
  value="1"
  text="tag one"
  removable
  @close="showTag1 = false"
/>
<NmorphTagItem
  v-show="showTag2"
  value="2"
  text="tag two"
  removable
  @close="showTag2 = false"
/>
<NmorphTagList v-model="list" />
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-removable">
    <attribute
      header="Removable"
      :subtitle="$t('overview.tag-item.removable.subtitle')"
      info-name="tag-item.removable"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tag-removable-overview">
          <ClientOnly>
            <NmorphTagItem
              v-show="showTag1"
              value="0"
              text="tag zero"
              :removable="false"
            />
            <NmorphTagItem
              v-show="showTag1"
              value="1"
              text="tag one"
              removable
              @close="showTag1 = false"
            />
            <NmorphTagItem
              v-show="showTag2"
              value="2"
              text="tag two"
              removable
              @close="showTag2 = false"
            />
            <NmorphTagList v-model="list" class="tag-list" />
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
  .nmorph-tag-item {
    margin-right: 8px;
  }
  .tag-list {
    margin-top: 8px;
  }
}
</style>
