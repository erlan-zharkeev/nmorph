<script setup lang="ts">
import { ref } from "vue";
import { NmorphSpace, NmorphTagList } from "@nmorph/nmorph-ui-kit";

const nmorphTags = ref([
  { value: "status", text: "Status" },
  { value: "priority", text: "Priority" },
  { value: "locked", text: "Locked", removable: false },
]);

const plainTags = ref([
  { value: "status", text: "Status" },
  { value: "priority", text: "Priority" },
  {
    value: "locked",
    text: "Locked",
    removable: false,
    color: "var(--nmorph-warn-color)",
  },
]);

const reactionTags = ref([
  {
    value: "plus-one",
    glyphKey: "👍",
    count: 3,
    visibleUsers: ["ER", "AK"],
    color: "var(--nmorph-success-color)",
  },
  {
    value: "eyes",
    glyphKey: "👀",
    count: 1,
    visibleUsers: ["NK"],
    color: "var(--nmorph-accent-color)",
  },
]);

const selectedTag = ref<string>();
</script>

<template>
  <NmorphSpace class="tag-list-basic-usage-overview" direction="column" align="start">
    <NmorphTagList v-model="nmorphTags" />
    <NmorphTagList
      v-model="plainTags"
      v-model:selected-value="selectedTag"
      design="plain"
      color="var(--nmorph-success-color)"
    />
    <NmorphTagList v-model="reactionTags" design="plain">
      <template #item="{ item }">
        <span>{{ item.glyphKey }}</span>
        <span v-if="item.count > 1">{{ item.count }}</span>
        <span class="reaction-users">
          <span
            v-for="user in item.visibleUsers"
            :key="user"
            class="reaction-users__avatar"
          >
            {{ user }}
          </span>
        </span>
      </template>
    </NmorphTagList>
  </NmorphSpace>
</template>

<style scoped>
.tag-list-basic-usage-overview {
  max-width: 100%;
}

.tag-list-basic-usage-overview :deep(.nmorph-tag-list) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.reaction-users {
  display: inline-flex;
  gap: 3px;
}

.reaction-users__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--tag-item-content-color);
  font-size: 9px;
  line-height: 1;
  border: 1px solid currentColor;
  border-radius: 50%;
}

</style>
