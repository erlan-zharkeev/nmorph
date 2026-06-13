<script setup lang="ts">
import { type IAttributesTableData, type ISlotsTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import {
  NmorphCallout,
  NmorphComponentThickness,
  NmorphDivider,
  NmorphIcon,
  NmorphIconChecked,
  NmorphIconDatabase,
  NmorphIconDocument,
  NmorphIconFiles,
  NmorphIconInfoFilled,
  NmorphIconList,
} from "@nmorph/nmorph-ui-kit";

const { t } = useI18n();

const attributesDataValue = `
  type NmorphFileFormValueType = File | File[] | INmorphCustomFileData[];
  type NmorphAvailableFormValueType<TCustomValue = never> =
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | Date
    | Date[]
    | null
    | NmorphFileFormValueType
    | TCustomValue;
  type NmorphFormValueType<TValue = NmorphAvailableFormValueType> = Record<
    string,
    { value: TValue; rules: NmorphRulesType }
  >;
  type NmorphRulesType = INmorphRule[];
  interface INmorphRule {
    pattern?: RegExp;
    numberCompareType?: NmorphNumberCompareOperator;
    booleanCompareType?: NmorphBooleanCompareOperator;
    arrayCompareType?: NmorphArrayValidationOperator;
    compareValue?: boolean | number | string | string[];
    fileMaxSize?: number;
    fileAllowedTypes?: string[];
    fileMaxCount?: number;
    error: string;
  }
  const NmorphArrayValidationOperator = {
    'contains-one': 'contains-one',
    'not-contains': 'not-contains',
    'full-eq': 'full-eq',
  } as const;
  type NmorphArrayValidationOperator = keyof typeof NmorphArrayValidationOperator;

  const NmorphNumberCompareOperator = {
    eq: 'eq',
    gte: 'gte',
    lte: 'lte',
    gt: 'gt',
    lt: 'lt',
  } as const;
  type NmorphNumberCompareOperator = keyof typeof NmorphNumberCompareOperator;

  const NmorphBooleanCompareOperator = {
    eq: 'eq',
    'not-eq': 'not-eq',
  } as const;
  type NmorphBooleanCompareOperator = keyof typeof NmorphBooleanCompareOperator;
`;

const exposesFormData = `
formValue: NmorphFormValueType;
fields: Record<
  string,
  {
    touched: Ref<boolean>;
    valid: Ref<boolean>;
    errors: Ref<string[]>;
    validate: () => void;
  }
>;
updateFieldValue: (
  fieldName: string,
  value: NmorphAvailableFormValueType | null
) => void;
validateField: (
  fieldName: string,
  inputValue?: NmorphAvailableFormValueType | null
) => FieldValidation | undefined;
isFormValid: Ref<boolean>;
isAnyTouched: Ref<boolean>;
`;

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: attributesDataValue,
    default: "-",
    required: true,
    modalName: "value",
  },
  {
    name: "validate-immediately",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const exposes = [
  {
    name: "form-data",
    type: exposesFormData,
    modalName: "from-data",
  },
];

const attributesDataFormItem: IAttributesTableData[] = [
  {
    name: "id",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "name",
    type: "String",
    default: "id",
  },
  {
    name: "autocomplete",
    type: "String",
    default: "-",
  },
  {
    name: "thickness",
    type: optionsToString(NmorphComponentThickness),
    default: "basic",
  },
  {
    name: "label",
    type: "String",
    default: "-",
  },
  {
    name: "show-validation-icon",
    type: "Boolean",
    default: "true",
  },
  {
    name: "static-error-box-space",
    type: "Boolean",
    default: "false",
  },
];
const slotDataFormItem: ISlotsTableData[] = [{ name: "default" }];
</script>

<template>
  <NmorphDivider />
  <section class="form-validation-guide">
    <NmorphCallout type="info">
      <template #header>
        <span class="form-validation-guide__title">
          <NmorphIcon size="small">
            <NmorphIconInfoFilled />
          </NmorphIcon>
          {{ t("overview.form.validation-guide.metadata.title") }}
        </span>
      </template>
      <p>
        {{ t("overview.form.validation-guide.metadata.content") }}
      </p>
    </NmorphCallout>

    <div class="form-validation-guide__grid">
      <NmorphCallout type="warning">
        <template #header>
          <span class="form-validation-guide__title">
            <NmorphIcon size="small">
              <NmorphIconDocument />
            </NmorphIcon>
            {{ t("overview.form.validation-guide.text.title") }}
          </span>
        </template>
        <p>{{ t("overview.form.validation-guide.text.content") }}</p>
        <div class="form-validation-guide__tokens">
          <code>pattern</code>
          <code>error</code>
        </div>
      </NmorphCallout>

      <NmorphCallout type="warning">
        <template #header>
          <span class="form-validation-guide__title">
            <NmorphIcon size="small">
              <NmorphIconDatabase />
            </NmorphIcon>
            {{ t("overview.form.validation-guide.number.title") }}
          </span>
        </template>
        <p>{{ t("overview.form.validation-guide.number.content") }}</p>
        <div class="form-validation-guide__tokens">
          <code>eq</code>
          <code>gte</code>
          <code>lte</code>
          <code>gt</code>
          <code>lt</code>
        </div>
      </NmorphCallout>

      <NmorphCallout type="warning">
        <template #header>
          <span class="form-validation-guide__title">
            <NmorphIcon size="small">
              <NmorphIconChecked />
            </NmorphIcon>
            {{ t("overview.form.validation-guide.boolean.title") }}
          </span>
        </template>
        <p>{{ t("overview.form.validation-guide.boolean.content") }}</p>
        <div class="form-validation-guide__tokens">
          <code>eq</code>
          <code>not-eq</code>
          <code>compareValue</code>
        </div>
      </NmorphCallout>

      <NmorphCallout type="warning">
        <template #header>
          <span class="form-validation-guide__title">
            <NmorphIcon size="small">
              <NmorphIconList />
            </NmorphIcon>
            {{ t("overview.form.validation-guide.array.title") }}
          </span>
        </template>
        <p>{{ t("overview.form.validation-guide.array.content") }}</p>
        <div class="form-validation-guide__tokens">
          <code>contains-one</code>
          <code>not-contains</code>
          <code>full-eq</code>
        </div>
      </NmorphCallout>

      <NmorphCallout type="warning">
        <template #header>
          <span class="form-validation-guide__title">
            <NmorphIcon size="small">
              <NmorphIconFiles />
            </NmorphIcon>
            {{ t("overview.form.validation-guide.file.title") }}
          </span>
        </template>
        <p>{{ t("overview.form.validation-guide.file.content") }}</p>
        <div class="form-validation-guide__tokens">
          <code>fileMaxSize</code>
          <code>fileAllowedTypes</code>
          <code>fileMaxCount</code>
        </div>
      </NmorphCallout>
    </div>
  </section>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table title="NmorphForm" name="form" :attributes="attributesData" :slots="slotData" :exposes="exposes" />
  </div>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table title="NmorphFormItem" name="form-item" additional-id="form-item" :attributes="attributesDataFormItem"
      :slots="slotDataFormItem" />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}

.form-validation-guide {
  display: grid;
  gap: 12px;
  margin: 16px 0;

  p {
    margin: 0;
  }
}

.form-validation-guide__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.form-validation-guide__title {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.form-validation-guide__tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.form-validation-guide__tokens code {
  padding: 2px 6px;
  background: color-mix(in srgb, var(--nmorph-text-color) 10%, transparent);
  border-radius: 4px;
  font-size: 0.9em;
}
</style>
