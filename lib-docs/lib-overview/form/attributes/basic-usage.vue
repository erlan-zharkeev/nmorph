<script setup lang="ts">
import {
  NmorphForm,
  NmorphFormItem,
  NmorphTextInput,
  NmorphRadioGroup,
  NmorphNumberInput,
  NmorphRadio,
  NmorphCheckboxGroup,
  NmorphCheckbox,
  NmorphSwitch,
  NmorphIcon,
  NmorphSelect,
  NmorphSlider,
  NmorphSelectOption,
  NmorphDatePicker,
  NmorphFileUpload,
  NmorphButton,
} from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";
import { useMock } from "../mock";

const { t } = useI18n();
const mock = useMock();

const scriptData = "";
const templateData = "";
const cssData = "";

const code = [scriptData, templateData, cssData];

const form = reactive({
  username: {
    value: "",
    rules: [
      { pattern: /.{5,}/, error: t("overview.form.basic-usage.too-short") },
    ],
  },
  years: {
    value: 18,
    rules: [
      {
        compareValue: 18,
        numberCompareType: "lt",
        error: t("overview.form.basic-usage.wrong-age"),
      },
    ],
  },
  drink: {
    value: "coffee",
    rules: [
      {
        compareValue: "kombucha",
        booleanCompareType: "eq",
        error: t("overview.form.basic-usage.we-dont-have-kombucha"),
      },
    ],
  },
  browsers: {
    value: ["chrome", "firefox"],
    rules: [
      {
        compareValue: ["ie"],
        arrayCompareType: "not-contains",
        error: t("overview.form.basic-usage.ie-not-supported"),
      },
    ],
  },
  numberValue: {
    value: 50,
    rules: [
      {
        compareValue: 30,
        numberCompareType: "lt",
        error: t("overview.form.basic-usage.value-must-greater-than-30"),
      },
      {
        compareValue: 80,
        numberCompareType: "gt",
        error: t("overview.form.basic-usage.value-must-less-than-80"),
      },
    ],
  },
  food: {
    value: [t("overview.form.basic-usage.apple")],
    rules: [
      {
        compareValue: [t("overview.form.basic-usage.pear")],
        arrayCompareType: "not-contains",
        error: t("overview.form.basic-usage.pear-is-not-available"),
      },
    ],
  },
  photo: {
    value: [],
    rules: [],
  },
  date: {
    value: new Date(),
    rules: [],
  },
  agreement: {
    value: true,
    rules: [
      {
        compareValue: false,
        booleanCompareType: "eq",
        error: t("overview.form.basic-usage.you-must-set-agreement"),
      },
    ],
  },
});

// const formValidatorHandler = (e) => {
//   console.log(e);
// };
</script>

<template>
  <div id="content-basic-usage">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="form-basic-usage-overview">
          <ClientOnly>
            <div class="nmorph-title-3">
              {{ $t("overview.form.basic-usage.is-valid") }} {{ form }}
            </div>
            <NmorphForm :value="form">
              <NmorphFormItem
                id="username"
                :label="$t('overview.form.basic-usage.username')"
              >
                <NmorphTextInput
                  v-model="form.username.value"
                  :placeholder="$t('overview.form.basic-usage.enter-username')"
                  clearable
                />
              </NmorphFormItem>
              <NmorphFormItem
                id="years"
                :label="$t('overview.form.basic-usage.years-old')"
              >
                <NmorphNumberInput
                  v-model="form.years.value"
                  :min="0"
                  :max="150"
                />
              </NmorphFormItem>
              <NmorphFormItem
                id="drink"
                :label="$t('overview.form.basic-usage.preferred-drink')"
              >
                <NmorphRadioGroup v-model="form.drink.value">
                  <NmorphRadio
                    v-for="option in mock.drinks"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                    :disabled="option.disabled"
                  />
                </NmorphRadioGroup>
              </NmorphFormItem>
              <NmorphFormItem
                id="browsers"
                :label="$t('overview.form.basic-usage.browsers')"
              >
                <NmorphCheckboxGroup
                  v-model="form.browsers.value"
                  direction="column"
                >
                  <NmorphCheckbox
                    v-for="option in mock.browsers"
                    :id="option.id"
                    :key="option.id"
                    :label="option.label"
                    :disabled="option.disabled"
                    style-type="button"
                  />
                </NmorphCheckboxGroup>
              </NmorphFormItem>
              <NmorphFormItem
                id="numberValue"
                :label="$t('overview.form.basic-usage.number-value')"
              >
                <NmorphSlider
                  v-model="form.numberValue.value"
                  :step="1"
                  :min="0"
                  :max="100"
                />
                <span class="form-basic-usage-overview__value">{{
                  form.numberValue.value
                }}</span>
              </NmorphFormItem>
              <NmorphFormItem
                id="food"
                :label="$t('overview.form.basic-usage.food')"
              >
                <NmorphSelect
                  v-model="form.food.value"
                  value-required
                  :options-map="mock.food"
                  fill
                >
                  <NmorphSelectOption
                    v-for="option in mock.food"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </NmorphSelect>
              </NmorphFormItem>
              <NmorphFormItem
                id="date"
                :label="$t('overview.form.basic-usage.choose-date')"
              >
                <NmorphDatePicker v-model="form.date.value" />
              </NmorphFormItem>
              <NmorphFormItem
                id="photo"
                :label="$t('overview.form.basic-usage.photo')"
              >
                <NmorphFileUpload v-model="form.photo.value" multiple />
              </NmorphFormItem>
              <NmorphFormItem
                id="agreement"
                :label="$t('overview.form.basic-usage.agreement')"
              >
                <NmorphSwitch v-model="form.agreement.value">
                  <template #thumb-on
                    ><NmorphIcon name="eye" width="10px" height="10px"
                  /></template>
                  <template #thumb-off
                    ><NmorphIcon name="eye-blocked" width="10px" height="10px"
                  /></template>
                </NmorphSwitch>
              </NmorphFormItem>
              <NmorphFormItem id="send">
                <NmorphButton
                  :text="$t('overview.form.basic-usage.send-form')"
                  width="100px"
                  fill
                />
              </NmorphFormItem>
            </NmorphForm>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.form-basic-usage-overview {
  width: 260px;
  .form-basic-usage-overview__value {
    margin-left: 8px;
  }
  .nmorph-text-input,
  .nmorph-number-input,
  .nmorph-radio-group,
  .nmorph-checkbox-group,
  .nmorph-select,
  .nmorph-date-picker,
  .nmorph-file-upload {
    width: 100%;
  }
}
</style>
