<script setup lang="ts">
import {
  NmorphTextInput,
  NmorphIcon,
  NmorphLink,
  NmorphDropdown,
  NmorphCheckbox,
  NmorphSwitch,
  useNmorph,
} from "@nmorph/nmorph-ui-kit";
import MoonIcon from "~/assets/images/moon.svg";
import SunIcon from "~/assets/images/sun.svg";
import TranslateIcon from "~/assets/images/translate.svg";
import GitlabIcon from "~/assets/images/gitlab.svg";

const nmorph = useNmorph();

const currentTheme = ref<string>("dark");
const setTheme = ref<(theme: any) => any>(() => {});

onMounted(() => {
  currentTheme.value = nmorph.theme.currentTheme.value;
  setTheme.value = nmorph.theme.setTheme;
});

interface INmorphProps {
  isMenuOpen: boolean;
}
const props = withDefaults(defineProps<INmorphProps>(), {});

interface INmorphEmit {
  (e: "toggle-menu"): void;
}
const emit = defineEmits<INmorphEmit>();

const config = useRuntimeConfig();
const { setLocale, locales } = useI18n();
const localePath = useLocalePath();

const searchQuery = ref("");

const translateBtn = ref(null);
const open = ref(false);

const closeHandler = () => {
  open.value = false;
};
const openTranslates = () => {
  open.value = !open.value;
};

const changeLocaleHandler = (locale: string) => {
  open.value = false;
  setLocale(locale);
};
const updateMenuHandler = () => {
  emit("toggle-menu");
};
</script>
<template>
  <header class="docs-top-bar nmorph-outset">
    <div class="docs-top-bar__left">
      <NmorphCheckbox
        class="docs-top-bar__burger"
        :model-value="props.isMenuOpen"
        @update:model-value="updateMenuHandler"
        label="menu"
        design="button"
      >
        <template name="label">
          <NmorphIcon name="burger" />
        </template>
      </NmorphCheckbox>
      <div class="docs-top-bar__logo">
        <NuxtLink :to="localePath('/')">
          <NmorphIcon name="logo" width="40px" />
        </NuxtLink>
      </div>
    </div>
    <div class="docs-top-bar__right">
      <div class="docs-top-bar__search">
        <NmorphTextInput :placeholder="$t('search')" v-model="searchQuery">
          <template #prepend-icon>
            <NmorphIcon name="search" />
          </template>
        </NmorphTextInput>
      </div>
      <div
        ref="translateBtn"
        @click="openTranslates"
        class="docs-top-bar__translate-btn"
      >
        <NmorphCheckbox
          v-model="open"
          design="button"
          size="small"
          class="docs-top-bar__translate-checkbox"
        >
          <template #label>
            <NmorphIcon>
              <TranslateIcon />
            </NmorphIcon>
          </template>
        </NmorphCheckbox>
        <NmorphDropdown
          v-if="translateBtn"
          :fill-width="false"
          :open="open"
          :relative-element="translateBtn"
          @on-outside-click="closeHandler"
          :x-offset="-40"
          :y-offset="10"
          :width="100"
        >
          <ul class="docs-translates__dropdown">
            <li
              v-for="localeData in locales"
              @click="changeLocaleHandler(localeData.code)"
            >
              {{ localeData.name }}
            </li>
          </ul>
        </NmorphDropdown>
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
      <NmorphSwitch
        :model-value="currentTheme"
        @update:model-value="setTheme"
        active-value="light"
        inactive-value="dark"
        class="docs-top-bar__element"
      >
        <template #thumb-on>
          <NmorphIcon width="10px" height="10px">
            <SunIcon class="sun-icon" />
          </NmorphIcon>
        </template>
        <template #thumb-off>
          <NmorphIcon width="10px" height="10px"> <MoonIcon /> </NmorphIcon>
        </template>
      </NmorphSwitch>
      <NmorphLink :href="config.public.NUXT_ENV_GIT_PATH">
        <NmorphIcon :path="GitlabIcon" size="medium" />
      </NmorphLink>
    </div>
  </header>
</template>

<style lang="scss">
$top-bar-height: 50px;

.docs-top-bar__translate-checkbox {
  --size: 28px;
}

.docs-top-bar {
  height: $top-bar-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px;
  position: sticky;
}

.docs-top-bar__translate-btn {
  cursor: pointer;
  margin-left: 16px;
  margin-right: 16px;
}

.docs-top-bar__element {
  margin-right: 12px;
  .sun-icon {
    margin-top: 2px;
  }
}

.docs-top-bar__left {
  display: flex;
  align-items: center;
  height: 100%;
}

.docs-top-bar__logo {
  height: 95%;
  border-radius: 4px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.docs-top-bar__right {
  display: flex;
  align-items: center;
}

.docs-translates__dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    padding: 4px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
}

.docs-top-bar__nav-list .router-link-active {
  position: relative;
  &:before {
    content: "";
    top: calc($top-bar-height / 2 + 4px);
    left: 0;
    width: 100%;
    height: 4px;
    position: absolute;
    background: var(--nmorph-accent-color);
  }
}

.docs-top-bar__nav {
  margin: 0 8px;
  display: flex;
}

.docs-top-bar__nav-list {
  display: flex;
  padding-left: 0;
  li {
    list-style-type: none;
    margin-right: 8px;
  }
}

.docs-top-bar__burger {
  margin-right: 8px;
  display: none;
}

@include max-width-query(768) {
  .docs-main-layout__left-aside {
    display: none;
  }
  .docs-main-layout {
    grid-template-columns: 1fr;
  }
  .docs-top-bar__burger {
    display: block;
  }
}
</style>
