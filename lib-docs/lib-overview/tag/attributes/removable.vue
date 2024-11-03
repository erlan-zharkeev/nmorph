<script setup lang="ts">
import { NmorphTagItem, NmorphTagList } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const showTag1 = ref(true);
  const showTag2 = ref(true);
  const list = ref([
    { value: "3", text: "Lorem ipsum" },
    { value: "4", text: "Neque porro quisquam" },
    { value: "5", text: "There is no one who loves ", removable: false },
  ]);
<\/script>
`;

const templateData = `
<template>
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
</template>
`;

const cssData = `
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
`;

const code = [scriptData, templateData, cssData];

const showTag1 = ref(true);
const showTag2 = ref(true);
const list = ref([
  { value: "3", text: "Lorem ipsum" },
  { value: "4", text: "Neque porro quisquam" },
  { value: "5", text: "There is no one who loves ", removable: false },
]);
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
              :text="$t('overview.tag-zero')"
              :removable="false"
            />
            <NmorphTagItem
              v-show="showTag1"
              value="1"
              :text="$t('overview.tag-one')"
              removable
              @close="showTag1 = false"
            />
            <NmorphTagItem
              v-show="showTag2"
              value="2"
              :text="$t('overview.tag-two')"
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
