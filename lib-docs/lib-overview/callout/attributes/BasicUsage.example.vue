<script setup lang="ts">
import { NmorphCallout } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="callout-basic-usage-overview">
    <NmorphCallout content="Useful content without a title." />
    <NmorphCallout
      title="Information"
      content="Useful content for the reader."
    />
    <NmorphCallout
      type="warning"
      title="Attention"
      content="Important content for the reader."
    />
    <NmorphCallout
      type="success"
      title="Success"
      content="Successful content for the reader."
    />
    <NmorphCallout
      type="error"
      title="Error"
      content="Error content for the reader."
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
