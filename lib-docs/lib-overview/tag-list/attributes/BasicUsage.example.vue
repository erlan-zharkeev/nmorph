<script setup lang="ts">
import { ref } from "vue";
import { NmorphSpace, NmorphTagList } from "@nmorph/nmorph-ui-kit";

const nmorphTags = ref([
  { value: "status", text: "Status" },
  { value: "priority", text: "Priority" },
  { value: "locked", text: "Locked", removable: false },
]);

const commonTags = ref([
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
    glyphKey: "+1",
    count: 3,
    visibleUsers: ["ER", "AK", "MJ"],
    color: "var(--nmorph-success-color)",
  },
  {
    value: "eyes",
    glyphKey: "eyes",
    count: 1,
    visibleUsers: ["NK"],
    color: "var(--nmorph-accent-color)",
  },
]);

const selectedTag = ref<string>();
</script>

<template>
  <NmorphSpace direction="column" align="start">
    <NmorphTagList v-model="nmorphTags" />
    <NmorphTagList
      v-model="commonTags"
      v-model:selected-value="selectedTag"
      design="common"
      color="var(--nmorph-success-color)"
    />
    <NmorphTagList v-model="reactionTags" design="common">
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
.reaction-users {
  display: inline-flex;
}

.reaction-users__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-left: -4px;
  color: var(--tag-item-content-color);
  font-size: 9px;
  line-height: 1;
  border: 1px solid currentColor;
  border-radius: 50%;
}

.reaction-users__avatar:first-child {
  margin-left: 0;
}
</style>
