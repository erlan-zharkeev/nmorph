<script setup lang="ts">
import { type IAttributesTableData, type ISlotsTableData } from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import {
  NmorphCard,
  NmorphComponentHeight,
  NmorphDivider,
} from "@nmorph/nmorph-ui-kit";

const attributesDataValue = `
  type NmorphAvailableFormValueType = string | string[] | number | number[] | boolean | boolean[] | Date | Date[]
  type NmorphFormValueType = Record<string, { value: NmorphAvailableFormValueType; rules: NmorphRulesType }>;
  type NmorphRulesType = INmorphRule[];
  interface INmorphRule {
    pattern?: RegExp;
    numberCompareType?: keyof typeof NmorphNumberCompareOperator;
    booleanCompareType?: keyof typeof NmorphBooleanCompareOperator;
    arrayCompareType?: keyof typeof NmorphArrayValidationOperator;
    compareValue?: number | string | string[];
    error: string;
  }
  enum NmorphArrayValidationOperator {
    'contains-one' = 'contains-one',
    'not-contains' = 'not-contains',
    'full-eq' = 'full-eq',
  }
  enum NmorphNumberCompareOperator {
    'eq' = 'eq',
    'gte' = 'gte',
    'lte' = 'lte',
    'gt' = 'gt',
    'lt' = 'lt',
  }
  enum NmorphBooleanCompareOperator {
    'eq' = 'eq',
    'not-eq' = 'not-eq',
  }
`;

const exposesFormData = `
fields: Record<
  string,
  {
    touched: Ref<boolean>;
    valid: Ref<boolean>;
    errors: Ref<string[]>;
    validate: () => void;
  }
>;
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
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
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
  <NmorphCard class="additional-data">
    <div class="container">
      <h2>1. Rule Types</h2>
      <p>
        You can define validation rules based on the type of value you want to
        validate:
      </p>

      <h3>Text Validation:</h3>
      <p>
        <strong>Rule Properties:</strong> <code>pattern</code> (uses regular
        expressions), <code>error</code>
      </p>

      <h3>Number Validation:</h3>
      <p>
        <strong>Rule Properties:</strong> <code>numberCompareType</code> (uses
        <code>NmorphNumberCompareOperator</code>), <code>compareValue</code>,
        <code>error</code>
      </p>

      <h3>Boolean Validation (Radio Button):</h3>
      <p>
        <strong>Rule Properties:</strong> <code>booleanCompareType</code> (uses
        <code>NmorphBooleanCompareOperator</code>), <code>compareValue</code>,
        <code>error</code>
      </p>

      <h3>Array Validation (Checkbox Group):</h3>
      <p>
        <strong>Rule Properties:</strong> <code>arrayCompareType</code> (uses
        <code>NmorphArrayValidationOperator</code>), <code>compareValue</code>,
        <code>error</code>
      </p>

      <h2>2. Enum Definitions</h2>
      <p>
        The following enums are used for defining different types of validation
        operators:
      </p>

      <h3>NmorphArrayValidationOperator:</h3>
      <ul>
        <li>
          <strong>contains-one:</strong> The array must contain at least one of
          the specified values.
        </li>
        <li>
          <strong>not-contains:</strong> The array must not contain any of the
          specified values.
        </li>
        <li>
          <strong>full-eq:</strong> The array must be equal to the specified
          values, including order and length.
        </li>
      </ul>

      <h3>NmorphNumberCompareOperator:</h3>
      <ul>
        <li>
          <strong>eq:</strong> The value must be equal to the specified value.
        </li>
        <li>
          <strong>gte:</strong> The value must be greater than or equal to the
          specified value.
        </li>
        <li>
          <strong>lte:</strong> The value must be less than or equal to the
          specified value.
        </li>
        <li>
          <strong>gt:</strong> The value must be greater than the specified
          value.
        </li>
        <li>
          <strong>lt:</strong> The value must be less than the specified value.
        </li>
      </ul>

      <h3>NmorphBooleanCompareOperator:</h3>
      <ul>
        <li>
          <strong>eq:</strong> The boolean value must be equal to the specified
          value.
        </li>
        <li>
          <strong>not-eq:</strong> The boolean value must not be equal to the
          specified value.
        </li>
      </ul>

      <h2>3. Accessing Validation State</h2>
      <p>
        After calling the <code>useFieldValidation</code> function, you will
        have access to:
      </p>
      <ul>
        <li>
          <strong>touched:</strong> Indicates if the field has been touched.
        </li>
        <li>
          <strong>valid:</strong> Indicates if the field is valid based on the
          defined rules.
        </li>
        <li>
          <strong>errors:</strong> An array containing error messages for the
          field.
        </li>
        <li>
          <strong>validate:</strong> A function that triggers the validation.
        </li>
      </ul>
    </div>
  </NmorphCard>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table
      title="NmorphForm"
      name="form"
      :attributes="attributesData"
      :slots="slotData"
      :exposes="exposes"
    />
  </div>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table
      title="NmorphFormItem"
      name="form-item"
      additional-id="form-item"
      :attributes="attributesDataFormItem"
      :slots="slotDataFormItem"
    />
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
    /* margin: 8px 0; */
    margin-top: 8px;
  }
  ul {
    margin-top: 0;
  }
}
</style>
