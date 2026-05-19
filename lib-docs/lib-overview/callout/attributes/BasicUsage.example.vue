<script setup lang="ts">
import { NmorphCallout } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="callout-basic-usage-overview">
    <NmorphCallout
      :content="$t('overview.callout.basic-usage.no-title-content')"
    />
    <NmorphCallout
      :title="$t('overview.callout.basic-usage.info-title')"
      :content="$t('overview.callout.basic-usage.info-content')"
    />
    <NmorphCallout
      type="warning"
      :title="$t('overview.callout.basic-usage.warning-title')"
      :content="$t('overview.callout.basic-usage.warning-content')"
    />
    <NmorphCallout
      type="success"
      :title="$t('overview.callout.basic-usage.success-title')"
      :content="$t('overview.callout.basic-usage.success-content')"
    />
    <NmorphCallout
      type="error"
      :title="$t('overview.callout.basic-usage.error-title')"
      :content="$t('overview.callout.basic-usage.error-content')"
    />
    <NmorphCallout
      type="success"
      title="Custom sizing"
      content="Callout sizes can follow design tokens through props."
      padding="var(--indentation-04)"
      border-radius="var(--border-radius-80)"
      accent-width="var(--indentation-02)"
      title-font-size="var(--font-size-large)"
      content-font-size="var(--font-size-base)"
    />
  </div>
</template>

<style lang="scss">
.callout-basic-usage-overview {
  display: grid;
  width: 100%;
  gap: 12px;
}
</style>
