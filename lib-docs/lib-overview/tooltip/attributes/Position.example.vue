<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tooltip-position-overview">
    <ClientOnly>
      <div class="elements">
        <div class="elements__element">
          <NmorphTooltip force-show>
            <NmorphButton :text="$t('overview.tooltip.text.button')" />
            <template #content>
              <div class="content">
                {{ $t("overview.tooltip.text.tooltip") }}
              </div>
            </template>
          </NmorphTooltip>
        </div>
        <div class="elements__element">
          <NmorphTooltip force-show position="bottom">
            <NmorphButton :text="$t('overview.tooltip.text.button')" />
            <template #content>
              <div class="content">
                {{ $t("overview.tooltip.text.tooltip") }}
              </div>
            </template>
          </NmorphTooltip>
        </div>
        <div class="elements__element">
          <NmorphTooltip force-show position="right">
            <NmorphButton :text="$t('overview.tooltip.text.button')" />
            <template #content>
              <div class="content">
                {{ $t("overview.tooltip.text.tooltip") }}
              </div>
            </template>
          </NmorphTooltip>
        </div>
      </div>
    </ClientOnly>
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
