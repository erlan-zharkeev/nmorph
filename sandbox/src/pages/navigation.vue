<script setup lang="ts">
import { ref, shallowRef } from "vue";
import {
  NmorphBacktop,
  NmorphBreadcrumb,
  NmorphBreadcrumbItem,
  NmorphButton,
  NmorphContextMenu,
  NmorphDropdown,
  NmorphTabPane,
  NmorphTabs,
} from "@nmorph/nmorph-ui-kit";
import SandboxSection from "@sandbox/components/SandboxSection.vue";

const activeTab = ref("tab1");
const panesTab = ref("overview");
const dropdownOpen = ref(false);
const dropdownTarget = shallowRef<HTMLElement | null>(null);
const contextMenuOpen = ref(false);
const contextMenuOptions = [
  "Open",
  "Rename",
  {
    label: "Delete",
    color: "var(--nmorph-error-text-color)",
  },
];

const panes = [
  { name: "overview", label: "Overview", content: "Content from panes prop" },
  { name: "settings", label: "Settings", content: "Second pane from array" },
  {
    name: "disabled",
    label: "Disabled",
    content: "Disabled content",
    disabled: true,
  },
];
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphTabs">
      <div class="stack">
        <NmorphTabs v-model="activeTab">
          <NmorphTabPane name="tab1" label="Tab 1" content="Fallback content">
            <template #label>Custom label</template>
            <div class="panel-content">Slot content for first tab.</div>
          </NmorphTabPane>
          <NmorphTabPane name="tab2" label="Tab 2">
            <div class="panel-content">Second tab content.</div>
          </NmorphTabPane>
          <NmorphTabPane name="tab3" label="Disabled" disabled>
            <div class="panel-content">Disabled tab content.</div>
          </NmorphTabPane>
        </NmorphTabs>
        <NmorphTabs v-model="panesTab" :panes="panes" stretch />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphBreadcrumb">
      <div class="stack">
        <NmorphBreadcrumb>
          <NmorphBreadcrumbItem to="/basic">Basic</NmorphBreadcrumbItem>
          <NmorphBreadcrumbItem to="/form">Form</NmorphBreadcrumbItem>
          <NmorphBreadcrumbItem to="/navigation" replace
            >Navigation</NmorphBreadcrumbItem
          >
        </NmorphBreadcrumb>
        <NmorphBreadcrumb separator=">">
          <NmorphBreadcrumbItem to="/data">Data</NmorphBreadcrumbItem>
          <NmorphBreadcrumbItem to="/feedback">Feedback</NmorphBreadcrumbItem>
          <NmorphBreadcrumbItem to="/others">Others</NmorphBreadcrumbItem>
        </NmorphBreadcrumb>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphDropdown">
      <div class="dropdown-demo">
        <div ref="dropdownTarget">
          <NmorphButton
            text="Toggle dropdown"
            @click="dropdownOpen = !dropdownOpen"
          />
        </div>
        <NmorphDropdown
          v-if="dropdownTarget"
          :open="dropdownOpen"
          :relative-element="dropdownTarget"
          placement="bottom-end"
          :width="220"
          :fill-width="false"
          :y-offset="8"
          @on-outside-click="dropdownOpen = false"
        >
          <div class="dropdown-menu">
            <button>Profile</button>
            <button>Billing</button>
            <button>Sign out</button>
          </div>
        </NmorphDropdown>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphContextMenu">
      <div class="context-menu-demo">
        <NmorphContextMenu
          v-model="contextMenuOpen"
          :options="contextMenuOptions"
          trigger="both"
          :y-offset="6"
          aria-label="Context actions"
        >
          <NmorphButton text="Context btn" />
        </NmorphContextMenu>
        <span class="context-menu-state">open: {{ contextMenuOpen }}</span>
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphBacktop">
      <div class="backtop-scroll">
        <div class="backtop-content">
          <p v-for="item in 18" :key="item">Scroll row {{ item }}</p>
          <NmorphBacktop :right="24" :bottom="24" :visibility-height="80" />
          <NmorphBacktop
            :right="76"
            :bottom="24"
            :visibility-height="120"
            design="common"
          >
            <NmorphButton text="Top" style-type="transparent" />
          </NmorphBacktop>
        </div>
      </div>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.stack {
  display: grid;
  gap: 14px;
}

.panel-content {
  min-height: 56px;
}

.dropdown-demo {
  position: relative;
  isolation: isolate;
  display: flex;
  justify-content: flex-end;
  width: 260px;
  padding: 12px;
  overflow: hidden;
}

.dropdown-menu {
  display: grid;
  gap: 4px;
  padding: 8px;
}

.dropdown-menu button {
  padding: 8px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--nmorph-text-color);
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background: var(--nmorph-accent-color);
  color: var(--nmorph-focus-text-color);
}

.context-menu-demo {
  display: flex;
  gap: 12px;
  align-items: center;
}

.context-menu-state {
  color: var(--nmorph-semi-contrast-text-color);
  font-size: 13px;
}

.backtop-scroll {
  position: relative;
  height: 260px;
  overflow: auto;
  border-radius: 8px;
  box-shadow:
    inset -2px -2px 4px var(--nmorph-light-shade-color),
    inset 2px 2px 4px var(--nmorph-dark-shade-color);
}

.backtop-content {
  display: grid;
  gap: 10px;
  min-height: 720px;
  padding: 16px;
}

.backtop-content p {
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--nmorph-main-color);
}
</style>
