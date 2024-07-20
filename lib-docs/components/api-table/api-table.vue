<script setup lang="ts">
import {
  NmorphTable,
  NmorphTableColumn,
  NmorphTableCell,
  capitalizeFirstChar,
} from "@nmorph/nmorph-ui-kit";

const { t } = useI18n();

interface IAttributesTableData {
  name: string;
  type: string;
  default: string;
}

interface ISlotsTableData {
  name: string;
}

interface IVariablesTableData extends ISlotsTableData {}

interface IProps {
  name: string;
  attributes: IAttributesTableData[];
  slots?: ISlotsTableData[];
  variables?: IVariablesTableData[];
}

const props = withDefaults(defineProps<IProps>(), {});

const getDescriptions = (
  data:
    | IAttributesTableData[]
    | ISlotsTableData[]
    | IVariablesTableData[]
    | undefined,
  block: "api" | "slot" | "variables"
) => {
  if (!data) return null;
  return data.map((el) => {
    return {
      ...el,
      description: t(`overview.${props.name}.${block}.${el.name}`),
    };
  });
};

const updatedAttributes = getDescriptions(props.attributes, "api");
const updatedSlots = getDescriptions(props.slots, "slot");
const updatedVariables = getDescriptions(props.variables, "variables");
</script>

<template>
  <div class="docs-api-table" id="content-api">
    <div class="docs-api-table__attributes" id="content-attributes">
      <h2 class="nmorph-title-1">{{ capitalizeFirstChar(props.name) }} Api</h2>
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("attributes") }}
      </h3>
      <NmorphTable
        v-if="updatedAttributes"
        :data="updatedAttributes"
        bordered
        :row-hover="false"
      >
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="center"
        />
        <NmorphTableColumn prop="type" :label="$t('type')" alignment="center">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
              <p v-html="row.type" />
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
        <NmorphTableColumn
          prop="default"
          :label="$t('default')"
          alignment="center"
        />
      </NmorphTable>
    </div>
    <div v-if="updatedSlots" class="docs-api-table__slots" id="content-slots">
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("slots") }}
      </h3>
      <NmorphTable :data="updatedSlots" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="center"
        />
      </NmorphTable>
    </div>
    <div
      v-if="updatedVariables"
      class="docs-api-table__variables"
      id="content-variables"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("variables") }}
      </h3>
      <NmorphTable :data="updatedVariables" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="center"
        />
      </NmorphTable>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  margin: 0 8px;
}

.docs-api-table__title {
  margin-bottom: 8px;
}

.docs-api-table__slots,
.docs-api-table__variables {
  margin-top: 16px;
}

.docs-enum {
  background-color: var(--nmorph-accent-color);
  color: var(--nmorph-white-color);
  text-transform: uppercase;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
