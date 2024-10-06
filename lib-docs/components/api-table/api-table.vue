<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
  type IExposesTableData,
  type IEventsTableData,
} from "~/types";
import {
  NmorphTable,
  NmorphTableColumn,
  NmorphTableCell,
} from "@nmorph/nmorph-ui-kit";

const { t } = useI18n();

interface IProps {
  title: string;
  name: string;
  attributes: IAttributesTableData[];
  slots?: ISlotsTableData[];
  variables?: IVariablesTableData[];
  exposes?: IExposesTableData[];
  events?: IEventsTableData[];
  additionalId?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  additionalId: "",
});

const getDescriptions = (
  data:
    | IAttributesTableData[]
    | ISlotsTableData[]
    | IVariablesTableData[]
    | undefined,
  block: "api" | "slot" | "variables" | "exposes" | "events"
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
const updatedExposes = getDescriptions(props.exposes, "exposes");
const updatedEvents = getDescriptions(props.events, "events");

const getID = (name: string) => {
  return `content-${
    props.additionalId ? `${props.additionalId}-${name}` : name
  }`;
};

const attributeNameLabel = (name: string, required: boolean) =>
  required ? `${name}*` : name;
</script>

<template>
  <div class="docs-api-table" :id="getID('api')">
    <div class="docs-api-table__attributes" :id="getID('attributes')">
      <h2 class="nmorph-title-1">{{ props.title }} Api</h2>
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("attributes") }}
      </h3>
      <ClientOnly>
        <NmorphTable
          v-if="updatedAttributes"
          :data="updatedAttributes"
          bordered
          :row-hover="false"
        >
          <NmorphTableColumn prop="name" :label="$t('name')" alignment="left">
            <template #default="{ scope }">
              <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
                {{
                  attributeNameLabel(row.name as string, Boolean(row.required))
                }}
              </NmorphTableCell>
            </template>
          </NmorphTableColumn>
          <NmorphTableColumn
            prop="description"
            :label="$t('description')"
            alignment="center"
          />
          <NmorphTableColumn prop="type" :label="$t('type')" alignment="center">
            <template #default="{ scope }">
              <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
                <p v-html="row.type" class="no-wrap" />
              </NmorphTableCell>
            </template>
          </NmorphTableColumn>
          <NmorphTableColumn
            prop="default"
            :label="$t('default')"
            alignment="center"
          />
        </NmorphTable>
      </ClientOnly>
    </div>
    <div
      v-if="updatedSlots?.length"
      class="docs-api-table__slots"
      :id="getID('slots')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("slots") }}
      </h3>
      <ClientOnly>
        <NmorphTable :data="updatedSlots" bordered :row-hover="false">
          <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
          <NmorphTableColumn
            prop="description"
            :label="$t('description')"
            alignment="center"
          />
        </NmorphTable>
      </ClientOnly>
    </div>
    <div
      v-if="updatedVariables?.length"
      class="docs-api-table__variables"
      :id="getID('variables')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("variables") }}
      </h3>
      <ClientOnly>
        <NmorphTable :data="updatedVariables" bordered :row-hover="false">
          <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
          <NmorphTableColumn
            prop="description"
            :label="$t('description')"
            alignment="right"
          />
        </NmorphTable>
      </ClientOnly>
    </div>
    <div
      v-if="updatedExposes?.length"
      class="docs-api-table__exposes"
      :id="getID('exposes')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("exposes") }}
      </h3>
      <ClientOnly>
        <NmorphTable :data="updatedExposes" bordered :row-hover="false">
          <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
          <NmorphTableColumn
            prop="type"
            :label="$t('type')"
            alignment="center"
          />
          <NmorphTableColumn
            prop="description"
            :label="$t('description')"
            alignment="right"
          />
        </NmorphTable>
      </ClientOnly>
    </div>
    <div
      v-if="updatedEvents?.length"
      class="docs-api-table__events"
      :id="getID('events')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("events") }}
      </h3>
      <ClientOnly>
        <NmorphTable :data="updatedEvents" bordered :row-hover="false">
          <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
          <NmorphTableColumn prop="type" :label="$t('type')" alignment="center">
            <template #default="{ scope }">
              <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
                <p v-html="row.type" class="no-wrap" />
              </NmorphTableCell>
            </template>
          </NmorphTableColumn>
          <NmorphTableColumn
            prop="description"
            :label="$t('description')"
            alignment="right"
          />
        </NmorphTable>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss">
.no-wrap {
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: normal;
}
.docs-api-table__title {
  margin-bottom: 8px;
}

.docs-api-table__slots,
.docs-api-table__variables,
.docs-api-table__exposes,
.docs-api-table__events {
  margin-top: 16px;
}

.docs-link {
  background-color: var(--nmorph-accent-color);
  color: var(--nmorph-white-color);
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
