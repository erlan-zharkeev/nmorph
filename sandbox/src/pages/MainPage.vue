<template>
  <div>
    <NmorphTabs v-model="activeTab" :stretch="true">
      <NmorphTabPane v-for="tab in tabs" :key="tab.name" v-bind="tab">
        <template #label="{ scope }">
          <div v-if="scope.name === 'tab-2'">Custom label</div>
          <div v-else>{{ scope.label }}</div>
        </template>
        <template #default="{ scope }"
          >custom content for {{ scope.name }}</template
        >
      </NmorphTabPane>
    </NmorphTabs>
    <NmorphTabs v-model="activeTab" :panes="tabs" stretch />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { NmorphTabs, NmorphTabPane } from "./../../../library/src/components";

const activeTab = ref("tab-1");
const tabs = ref([
  { name: "tab-1", label: "Вкладка 1", content: "Контент для вкладки 1" },
  {
    name: "tab-2",
    label: "Вкладка 2",
    content: "Контент для вкладки 2",
    disabled: true,
  },
  {
    name: "tab-3",
    label: "Вкладка 3",
    content: "Контент для вкладки 3",
  },
]);

// Обработчик события 'tab-change'
const handleTabChange = (newValue: string) => {
  console.log(`Вкладка изменена, новая вкладка: ${newValue}`);
  // Дополнительная логика для выполнения при смене вкладки
};

onMounted(async () => {
  await nextTick();
  // Здесь можно добавить логику, которая работает с DOM
});
</script>

<style scoped>
.nmorph-tab-content {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 8px;
}

.nmorph-tabs__label {
  cursor: pointer;
  font-weight: bold;
  padding: 8px 0;
}
</style>
