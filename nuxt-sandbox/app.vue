<script setup>
import { computed, inject, ref } from "vue";
import {
  NmorphAlert,
  NmorphBadge,
  NmorphButton,
  NmorphCard,
  NmorphCheckbox,
  NmorphNotificationProvider,
  NmorphProgress,
  NmorphSelect,
  NmorphSwitch,
  NmorphTextInput,
  useNmorphNotification,
} from "@nmorph/nmorph-ui-kit";

const nmorph = import.meta.client ? inject("nmorph") : null;
const notificationProvider = useNmorphNotification();

const checked = ref(true);
const enabled = ref(false);
const selected = ref("basic");
const text = ref("Nuxt sandbox");
const progress = ref(64);

const selectOptions = [
  { label: "Basic", value: "basic" },
  { label: "Forms", value: "forms" },
  { label: "Feedback", value: "feedback" },
];

const currentTheme = computed(() => nmorph?.theme.currentTheme.value || "dark");

const setTheme = (theme) => {
  nmorph?.theme.setTheme(theme);
};

const pushNotification = () => {
  notificationProvider.notify({
    content: "Nuxt sandbox notification",
    duration: 2000,
    type: "success",
    width: "fit-content",
    closable: false,
    bordered: false,
  });
};

const increaseProgress = () => {
  progress.value = progress.value >= 100 ? 24 : progress.value + 12;
};
</script>

<template>
  <ClientOnly>
    <NmorphNotificationProvider
      :notifications="notificationProvider.notifications.value"
      placement="top-center"
    />
  </ClientOnly>
  <main class="sandbox">
    <section class="sandbox__header">
      <div>
        <p class="sandbox__eyebrow">Nmorph Nuxt</p>
        <h1>Nuxt sandbox</h1>
      </div>
      <div class="sandbox__actions">
        <NmorphButton text="Light" @click="setTheme('light')" />
        <NmorphButton text="Dark" @click="setTheme('dark')" />
      </div>
    </section>

    <section class="sandbox__grid">
      <NmorphCard class="sandbox__panel">
        <div class="sandbox__panel-header">
          <h2>Install state</h2>
          <NmorphBadge :value="currentTheme" is-tag />
        </div>
        <NmorphAlert
          type="success"
          title="Nuxt plugin mounted"
          content="Library plugin, i18n messages, theme, and shared providers are loaded from a Nuxt app."
        />
      </NmorphCard>

      <NmorphCard class="sandbox__panel">
        <div class="sandbox__panel-header">
          <h2>Controls</h2>
        </div>
        <div class="sandbox__stack">
          <NmorphTextInput v-model="text" placeholder="Enter text" fill />
          <NmorphSelect v-model="selected" :options="selectOptions" fill />
          <div class="sandbox__inline">
            <NmorphCheckbox v-model="checked" label="Checked" />
            <NmorphSwitch v-model="enabled" />
          </div>
        </div>
      </NmorphCard>

      <NmorphCard class="sandbox__panel">
        <div class="sandbox__panel-header">
          <h2>Feedback</h2>
        </div>
        <div class="sandbox__stack">
          <NmorphProgress :percentage="progress" />
          <div class="sandbox__inline">
            <NmorphButton text="Progress" @click="increaseProgress" />
            <NmorphButton text="Notify" @click="pushNotification" />
          </div>
        </div>
      </NmorphCard>
    </section>
  </main>
</template>
