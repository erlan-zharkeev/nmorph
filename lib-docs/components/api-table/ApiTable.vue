<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
  type IExposesTableData,
  type IEventsTableData,
  type ITranslates,
} from "~/types";
import {
  NmorphTable,
  NmorphTableColumn,
  NmorphTableCell,
  NmorphDialog,
} from "@nmorph/nmorph-ui-kit";
import { linkApiType } from "~/utils/api-type-links";

const { t, te } = useI18n();

interface IProps {
  title: string;
  name: string;
  attributes: IAttributesTableData[];
  slots?: ISlotsTableData[];
  variables?: IVariablesTableData[];
  exposes?: IExposesTableData[];
  events?: IEventsTableData[];
  translates?: ITranslates[];
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
  block: "api" | "slot" | "variables" | "exposes" | "events" | "translates",
) => {
  if (!data) return null;
  return data.map((el) => {
    const descriptionKey = `overview.${props.name}.${block}.${el.name}`;
    return {
      ...el,
      description: te(descriptionKey) ? t(descriptionKey) : el.description || descriptionKey,
    };
  });
};

const updatedAttributes = computed(() =>
  getDescriptions(props.attributes, "api"),
);
const updatedSlots = computed(() => getDescriptions(props.slots, "slot"));
const updatedVariables = computed(() =>
  getDescriptions(props.variables, "variables"),
);
const updatedExposes = computed(() =>
  getDescriptions(props.exposes, "exposes"),
);
const updatedEvents = computed(() => getDescriptions(props.events, "events"));
const updatedTranslates = computed(() =>
  getDescriptions(props.translates, "translates"),
);

const getID = (name: string) => {
  return `content-${
    props.additionalId ? `${props.additionalId}-${name}` : name
  }`;
};

const dialogs = ref<Record<string, boolean>>({});

const clickDialog = (key: string) => {
  dialogs.value[key] = true;
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
              <NmorphDialog
                v-model="dialogs[row.modalName as string]"
                title="Type"
                width="auto"
              >
                <code-example lang="javascript">{{ row.type }}</code-example>
              </NmorphDialog>
              <a
                v-if="row.modalName"
                class="docs-link"
                @click="() => clickDialog(row.modalName as string)"
              >
                {{ row.modalName }}
              </a>
              <p
                v-html="linkApiType(row.type as string)"
                class="no-wrap"
                v-else
              />
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
    <div
      v-if="updatedSlots?.length"
      class="docs-api-table__slots"
      :id="getID('slots')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("slots") }}
      </h3>
      <NmorphTable :data="updatedSlots" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="right"
        />
      </NmorphTable>
    </div>
    <div
      v-if="updatedVariables?.length"
      class="docs-api-table__variables"
      :id="getID('variables')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("variables") }}
      </h3>
      <NmorphTable :data="updatedVariables" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="right"
        />
      </NmorphTable>
    </div>
    <div
      v-if="updatedExposes?.length"
      class="docs-api-table__exposes"
      :id="getID('exposes')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("exposes") }}
      </h3>
      <NmorphTable :data="updatedExposes" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn prop="type" :label="$t('type')" alignment="center">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
              <NmorphDialog
                v-model="dialogs[row.modalName as string]"
                title="Type"
                width="auto"
              >
                <code-example lang="javascript">{{ row.type }}</code-example>
              </NmorphDialog>
              <a
                v-if="row.modalName"
                class="docs-link"
                @click="() => clickDialog(row.modalName as string)"
              >
                {{ row.modalName }}
              </a>
              <p
                v-html="linkApiType(row.type as string)"
                class="no-wrap"
                v-else
              />
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="right"
        />
      </NmorphTable>
    </div>
    <div
      v-if="updatedEvents?.length"
      class="docs-api-table__events"
      :id="getID('events')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("events") }}
      </h3>
      <NmorphTable :data="updatedEvents" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn prop="type" :label="$t('type')" alignment="center">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
              <p v-html="linkApiType(row.type as string)" class="no-wrap" />
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="right"
        />
      </NmorphTable>
    </div>
    <div
      v-if="updatedTranslates?.length"
      class="docs-api-table__translates"
      :id="getID('translates')"
    >
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ $t("translates") }}
      </h3>
      <NmorphTable :data="updatedTranslates" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn
          prop="description"
          :label="$t('text')"
          alignment="right"
        />
      </NmorphTable>
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
.docs-api-table__events,
.docs-api-table__translates {
  margin-top: 16px;
}

.docs-link {
  background-color: var(--nmorph-accent-color);
  color: var(--nmorph-white-color);
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
}

.nmorph-dialog code {
  text-align: left;
}

@include max-width-query(768) {
  .nmorph-table__cell-content {
    font-size: 10px;
  }

  .nmorph-table .nmorph-table__cell--data {
    font-size: 10px;
  }
}
</style>
