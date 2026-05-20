<script setup lang="ts">
import { NmorphTabPane, NmorphTabs } from "@nmorph/nmorph-ui-kit";

const activeTab = ref("tab-1");
const customActiveTab = ref("tab-1");

const tabs = ref([
  { name: "tab-1", label: "Tab 1", content: "Lorem ipsum 1" },
  {
    name: "tab-2",
    label: "Tab 2",
    content: "Lorem ipsum 2",
    disabled: true,
  },
  {
    name: "tab-3",
    label: "Tab 3",
    content: "Lorem ipsum 3",
  },
]);
</script>

<template>
  <div class="tabs-basic-usage-overview">
    <ClientOnly>
      <div class="elements">
        <div class="elements__element">
          <NmorphTabs v-model="customActiveTab" :stretch="true">
            <NmorphTabPane v-for="tab in tabs" :key="tab.name" v-bind="tab">
              <template #label="{ scope }">
                <div v-if="scope.name === 'tab-2'">Custom label</div>
                <div v-else>{{ scope.label }}</div>
              </template>
              <template #default="{ scope }">
                Custom content for
                {{ scope.name }}</template
              >
            </NmorphTabPane>
          </NmorphTabs>
        </div>
        <div class="elements__element">
          <NmorphTabs v-model="activeTab" :panes="tabs" stretch />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.tabs-basic-usage-overview {
  .elements {
    display: flex;
    flex-wrap: wrap;
  }

  .elements__element {
    margin-right: 24px;
    margin-bottom: 8px;
  }
}
</style>
