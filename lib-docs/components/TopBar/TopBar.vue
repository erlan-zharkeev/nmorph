<script setup lang="ts">
import {
  NmorphTextInput,
  NmorphSwitch,
  NmorphIcon,
  NmorphLink,
  NmorphSelect,
  NmorphDropdown,
  NmorphButton,
} from "@nmorph/nmorph-ui-kit";
import MoonIcon from "~/assets/images/moon.svg";
import SunIcon from "~/assets/images/sun.svg";
import TranslateIcon from "~/assets/images/translate.svg";
import GitlabIcon from "~/assets/images/gitlab.svg";

const config = useRuntimeConfig();
const { locale, setLocale, locales } = useI18n();
const localePath = useLocalePath();

const isThemeLight = ref(true);
const searchQuery = ref("");

const translateBtn = ref(null);
const open = ref(true);

const closeHandler = () => {
  open.value = false;
};
const openTranslates = () => {
  open.value = !open.value;
};
</script>
<template>
  <header class="docs-top-bar nmorph-outset">
    <div class="docs-top-bar__logo nmorph-outset">
      <NuxtLink :to="localePath('/')">
        <img src="~/assets/images/logo.webp" />
      </NuxtLink>
    </div>
    <div class="docs-top-bar__right">
      <div class="docs-top-bar__search">
        <NmorphTextInput :placeholder="$t('search')" v-model="searchQuery" />
      </div>
      <nav class="docs-top-bar__nav">
        <ul class="docs-top-bar__nav-list">
          <li>
            <NuxtLink :to="localePath('/guide')">{{ $t("guide") }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/components')">{{
              $t("components")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/about')">{{ $t("about") }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <NmorphSwitch v-model="isThemeLight" class="docs-top-bar__element">
        <template #thumb-on>
          <NmorphIcon :path="SunIcon" />
        </template>
        <template #thumb-off>
          <NmorphIcon :path="MoonIcon" />
        </template>
      </NmorphSwitch>
      <div ref="translateBtn" @click="openTranslates">
        <NmorphIcon
          :path="TranslateIcon"
          size="medium"
          class="docs-top-bar__element docs-top-bar__translate-trigger"
        />
      </div>
      <NmorphDropdown
        v-if="translateBtn"
        :open="open"
        :relative-element="translateBtn"
        @on-outside-click="closeHandler"
        :width="50"
      >
        <ul class="docs-translates__dropdown">
          <li v-for="localeData in locales" @click="setLocale(localeData.code)">
            {{ localeData.name }}
          </li>
        </ul>
      </NmorphDropdown>

      <NmorphLink :href="config.public.NUXT_ENV_GIT_PATH">
        <NmorphIcon :path="GitlabIcon" size="medium" />
      </NmorphLink>
    </div>
  </header>
</template>

<style lang="scss">
$top-bar-height: 50px;

.docs-top-bar {
  height: $top-bar-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px 4px 8px;
  position: sticky;
}

.docs-top-bar__element {
  margin-right: 12px;
}

.docs-top-bar__right {
  display: flex;
  align-items: center;
}

// TODO удалить после добавления в либу
.nmorph-icon__as-image {
  display: flex;
  svg {
    color: var(--accent-color-00);
  }
}

.docs-top-bar__translate-trigger {
  // width: 50px;
}

.docs-translates__dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.router-link-exact-active {
  position: relative;
  &:before {
    content: "";
    top: $top-bar-height / 2 + 5px;
    left: 0;
    width: 100%;
    height: 4px;
    position: absolute;
    background: var(--accent-color-00);
  }
}

.docs-top-bar__nav {
  margin: 0 8px;
}

.docs-top-bar__nav-list {
  display: flex;
  li {
    list-style-type: none;
    margin-right: 8px;
  }
  a {
    text-decoration: none;
  }
}

.docs-top-bar__logo {
  height: 95%;
  border-radius: 4px;
  overflow: hidden;
  border-radius: 8px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
