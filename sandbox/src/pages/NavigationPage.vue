<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphTabs,
  NmorphTabPane,
  NmorphBreadcrumb,
  NmorphBreadcrumbItem,
} from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const activeTab = ref('tab1')
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphTabs">
      <NmorphTabs v-model="activeTab">
        <NmorphTabPane name="tab1" label="Tab 1" content="Content of Tab 1" />
        <NmorphTabPane name="tab2" label="Tab 2" content="Content of Tab 2" />
        <NmorphTabPane name="tab3" label="Tab 3" content="Content of Tab 3" />
      </NmorphTabs>
    </SandboxSection>

    <SandboxSection title="NmorphBreadcrumb">
      <NmorphBreadcrumb>
        <NmorphBreadcrumbItem>Home</NmorphBreadcrumbItem>
        <NmorphBreadcrumbItem>Category</NmorphBreadcrumbItem>
        <NmorphBreadcrumbItem>Current page</NmorphBreadcrumbItem>
      </NmorphBreadcrumb>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page { display: grid; gap: 24px; }
</style>
