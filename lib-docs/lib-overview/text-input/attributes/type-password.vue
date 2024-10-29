<script setup lang="ts">
import { NmorphButton, NmorphTextInput } from "@nmorph/nmorph-ui-kit";

const scriptData = "";
const templateData = "";
const cssData = "";
const code = [scriptData, templateData, cssData];

const typePassword = ref(true);
</script>

<template>
  <div id="content-type-password">
    <attribute
      header="Type-password"
      :subtitle="$t('overview.text-input.type-password.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="text-input-type-password-overview">
          <ClientOnly>
            <NmorphButton
              :text="typePassword ? 'Common type' : 'Password type'"
              @click="typePassword = !typePassword"
              class="type-input-button"
            />
            <NmorphTextInput :type-password="typePassword" />
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
.text-input-type-password-overview {
  .type-input-button {
    margin-bottom: 8px;
  }
}
</style>
