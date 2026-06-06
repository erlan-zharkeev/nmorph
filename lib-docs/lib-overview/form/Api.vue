<script setup lang="ts">
import { type IAttributesTableData, type ISlotsTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import {
  NmorphCard,
  NmorphComponentThickness,
  NmorphDivider,
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
  <NmorphCard>
    <div class="additional-data" v-html="t('overview.form.explanation')" />
  </NmorphCard>
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
.additional-data {
  margin: 16px 0;
}

.docs-api-table {
  margin: 16px 0;
}

.additional-data {
  h2 {
    margin-top: 8px;
  }

  ul {
    margin-top: 0;
  }
}
</style>
