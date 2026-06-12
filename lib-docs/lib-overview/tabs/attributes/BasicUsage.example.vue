<script setup lang="ts">
import { NmorphTabPane, NmorphTabs } from "@nmorph/nmorph-ui-kit";

const activeTab = ref("tab-1");
const customActiveTab = ref("tab-1");

const tabs = ref([
  {
    name: "tab-1",
    label: "Tab 1",
    content: "Overview content with enough space to show the stretched tabs layout.",
  },
  {
    name: "tab-2",
    label: "Tab 2",
    content: "A disabled tab stays visible while other labels keep equal width.",
    disabled: true,
  },
  {
    name: "tab-3",
    label: "Tab 3",
    content: "Details content for the selected tab.",
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
                <div class="tabs-basic-usage-overview__content">
                  <strong>Custom content for {{ scope.name }}</strong>
                  <span>{{ scope.content }}</span>
                </div>
              </template>
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
  width: 100%;

  .elements {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    width: 100%;
  }

  .elements__element {
    min-width: 0;
  }

  :deep(.nmorph-tabs) {
    width: 100%;
  }

  :deep(.nmorph-tabs__content) {
    min-height: 96px;
  }
}

.tabs-basic-usage-overview__content {
  display: grid;
  gap: 8px;
}
</style>
