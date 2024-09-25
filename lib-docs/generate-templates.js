import { capitalizeFirstChar, camelToKebab, camelToTitle } from "@nmorph/nmorph-ui-kit"

export const generateAttribute = (componentName, attribute) => `
<script setup lang="ts">
import { Nmorph${capitalizeFirstChar(componentName)} } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-${camelToKebab(attribute)}">
    <attribute
      header="${camelToTitle(attribute)}"
      :subtitle="$t('overview.${componentName}.${camelToKebab(attribute)}.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="${componentName}-${camelToKebab(attribute)}-overview">
          <ClientOnly>
            <Nmorph${capitalizeFirstChar(componentName)} />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{ templateData }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{ scriptData }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.${componentName}-${camelToKebab(attribute)}-overview {}
</style>
`;

export const generatePageContent = (componentName) =>
`
<template>
  <component-overview name="${componentName}" />
</template>
`;

export const generateIndex = () => `
import Api from "./api.vue";
import { Attributes } from "./attributes";
export default [...Attributes, Api];
`;

export const generateApiContent = (attributes, componentName) =>
`
<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData: IAttributesTableData[] = [${attributes.map((attr) => `{
  name: "${camelToKebab(attr)}",
  type: "",
  default: "",
}`)}];

const slotData: ISlotsTableData[] = [];

const variables: IVariablesTableData[] = [];
</script>

<template>
<div class="docs-api-table">
  <api-table
    title="${componentName}"
    name="${componentName}"
    :attributes="attributesData"
    :slots="slotData"
    :variables="variables"
  />
</div>
</template>
`
export const generateNewCategoryObject = (category, fullName) => `
  {
    name: "${category}",
    components: [${fullName}]
  },
`;
