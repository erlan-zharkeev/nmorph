<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tooltip-position-overview">
    <div class="elements">
      <div class="elements__element">
        <NmorphTooltip force-show>
          <NmorphButton text="Button" />
          <template #content>
            <div class="content">Tooltip</div>
          </template>
        </NmorphTooltip>
      </div>
      <div class="elements__element">
        <NmorphTooltip force-show position="bottom">
          <NmorphButton text="Button" />
          <template #content>
            <div class="content">Tooltip</div>
          </template>
        </NmorphTooltip>
      </div>
      <div class="elements__element">
        <NmorphTooltip force-show position="right">
          <NmorphButton text="Button" />
          <template #content>
            <div class="content">Tooltip</div>
          </template>
        </NmorphTooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tooltip-position-overview {
  .elements {
    display: flex;
  }

  .elements__element {
    margin-right: 8px;
  }
}
</style>
