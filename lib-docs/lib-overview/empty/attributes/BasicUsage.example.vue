<script setup lang="ts">
import {
  NmorphButton,
  NmorphEmpty,
  NmorphIcon,
  NmorphIconSearch,
} from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="empty-basic-usage-overview">
    <NmorphEmpty
      title="No projects"
      description="Create a project to start filling this workspace."
    >
      <template #action>
        <NmorphButton text="Create project" height="thin" />
      </template>
    </NmorphEmpty>

    <NmorphEmpty
      design="common"
      title="No search results"
      description="Try a different query or clear active filters."
      :icon-size="40"
      min-height="140px"
    >
      <template #icon>
        <NmorphIcon
          width="40px"
          height="40px"
          color="var(--nmorph-accent-color)"
        >
          <NmorphIconSearch />
        </NmorphIcon>
      </template>
    </NmorphEmpty>
  </div>
</template>

<style lang="scss">
.empty-basic-usage-overview {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
</style>
