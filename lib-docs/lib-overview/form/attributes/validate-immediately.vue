<script setup lang="ts">
import { NmorphForm } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-validate-immediately">
    <attribute
      header="Validate-immediately"
      :subtitle="$t('overview.form.validate-immediately.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="form-validate-immediately-overview">
          <ClientOnly>
            <!-- <NmorphForm /> -->
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.form-validate-immediately-overview {
}
</style>
