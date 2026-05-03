<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import {
  NmorphBadge,
  NmorphButton,
  NmorphCard,
  NmorphColorPicker,
  NmorphIcon,
  NmorphIconCheck,
  NmorphIconUsers,
  NmorphTextInput,
  NmorphSelectButton,
  NmorphSelectButtonItem,
  NmorphForm,
  NmorphFormItem,
  useNmorph,
} from "@nmorph/nmorph-ui-kit";
import type { NmorphFormValueType } from "@nmorph/nmorph-ui-kit";

onMounted(() => {
  useNmorph().theme.setTheme('dark');
});

const { t, locale } = useI18n();
const textValue = ref("");
const thinColorValue = ref("#f97316");
const thickColorValue = ref("#10b981");
const badgeTeamSize = ref(12);
const selectButtonValue = ref("on");
const selectButtonOptions = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
  { value: "maybe", label: "Maybe" },
];

const setLocale = (nextLocale: "en" | "ru") => {
  locale.value = nextLocale;
};

const formValue = ref<NmorphFormValueType>({
  email: {
    value: "",
    rules: [
      { pattern: /^.+$/, error: "Email is required" },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: "Enter a valid email" },
    ],
  },
  password: {
    value: "",
    rules: [
      { pattern: /^.+$/, error: "Password is required" },
      { pattern: /^.{8,}$/, error: "Minimum 8 characters" },
    ],
  },
});
</script>

<template>
  <main class="sandbox-page">
    <NmorphCard class="sandbox-card">
      <h1>{{ t("title") }}</h1>
      <p>{{ t("description") }}</p>

      <div class="lang-controls">
        <p class="lang-title">{{ t("languageTitle") }}:</p>
        <div class="lang-buttons">
          <NmorphButton :text="t('langEn')" @click="setLocale('en')" />
          <NmorphButton :text="t('langRu')" @click="setLocale('ru')" />
        </div>
        <p>{{ t("currentLanguage") }}: {{ locale }}</p>
      </div>

      <NmorphButton text="Test Nmorph Button" class="sandbox-page__test-btn" />
      <NmorphButton class="sandbox-page__test-btn">
        <div class="sandbox-page__button-with-icon">
          <NmorphIcon>
            <NmorphIconCheck />
          </NmorphIcon>
          <span>Button with icon</span>
        </div>
      </NmorphButton>

      <section class="sandbox-badge">
        <p>NmorphBadge custom value slot</p>
        <div class="sandbox-badge__demo">
          <NmorphBadge :value="badgeTeamSize" color="var(--nmorph-success-color)">
            <template #value>
              <div class="sandbox-badge__value">
                <NmorphIcon width="10px" height="10px" color="currentColor">
                  <NmorphIconUsers />
                </NmorphIcon>
                <span>{{ badgeTeamSize }}</span>
              </div>
            </template>
            <NmorphButton text="Team" />
          </NmorphBadge>
        </div>
      </section>

      <section class="sandbox-select-button">
        <p>NmorphSelectButton: {{ selectButtonValue }}</p>
        <NmorphSelectButton v-model="selectButtonValue">
          <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
          <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
        </NmorphSelectButton>
        <NmorphButton height="thin" :text="t('langRu')" @click="setLocale('ru')" />
        <NmorphSelectButton v-model="selectButtonValue" :options="selectButtonOptions" height="thin" />
      </section>

      <section class="sandbox-input">
        <div class="sandbox-input__controls">
          <p>value: {{ textValue }}</p>
        </div>
        <NmorphTextInput v-model="textValue" clearable placeholder="Type something" />
      </section>

      <section class="sandbox-color-picker">
        <p>NmorphColorPicker</p>
        <div class="sandbox-color-picker__grid">
          <div class="sandbox-color-picker__item">
            <span>thin</span>
            <NmorphColorPicker v-model="thinColorValue" height="thin" />
          </div>
          <div class="sandbox-color-picker__item">
            <span>default</span>
            <NmorphColorPicker show-value />
          </div>
          <div class="sandbox-color-picker__item">
            <span>thick</span>
            <NmorphColorPicker v-model="thickColorValue" height="thick" show-value />
          </div>
        </div>
      </section>

      <NmorphForm :value="formValue">
        <NmorphFormItem id="email" label="Email">
          <NmorphTextInput
            v-model="(formValue.email.value as string)"
            placeholder="Enter email"
          />
        </NmorphFormItem>
        <NmorphFormItem id="password" label="Password">
          <NmorphTextInput
            v-model="(formValue.password.value as string)"
            type="password"
            placeholder="Enter password"
          />
        </NmorphFormItem>
      </NmorphForm>
    </NmorphCard>
  </main>
</template>

<style scoped>
.sandbox-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.sandbox-card {
  width: min(560px, 100%);
  padding: 24px;
  display: grid;
  gap: 12px;
}

.lang-controls {
  display: grid;
  gap: 10px;
}

.lang-title {
  font-weight: 600;
}

.lang-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

h1,
p {
  margin: 0;
}

.sandbox-page__test-btn {
  margin-top: 8px;
}

.sandbox-page__button-with-icon {
  display: flex;
  align-items: center;
  gap: 4px;
}

.sandbox-select-button {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.sandbox-badge {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.sandbox-badge__demo {
  width: fit-content;
}

.sandbox-badge__value {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.sandbox-input {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.sandbox-input__controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sandbox-color-picker {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.sandbox-color-picker__grid {
  display: grid;
  gap: 10px;
}

.sandbox-color-picker__item {
  display: grid;
  gap: 6px;
}
</style>
