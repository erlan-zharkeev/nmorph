<script setup lang="ts">
import {
  NmorphIcon,
  NmorphLink,
  NmorphDropdown,
  NmorphCheckbox,
  NmorphTextInput,
  NmorphIconSearch,
  NmorphIconLogo,
  NmorphIconMenu,
} from "@nmorph/nmorph-ui-kit";
import TranslateIcon from "~/assets/icons/translate.svg";
import GithubIcon from "~/assets/icons/github.svg";
import type { LocaleObject } from "@nuxtjs/i18n";
import SearchDialog from "~/components/search-dialog/SearchDialog.vue";
import libraryData from "../../../library/package.json";

const repositoryUrl = libraryData.repository.url;
const switchLocalePath = useSwitchLocalePath();

const { locales, locale } = useI18n();
const route = useRoute();

const availableLocales = computed<LocaleObject[]>(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const localePath = useLocalePath();

const translateBtn = ref(null);
const translateDropdownOpen = ref(false);
const searchOpen = ref(false);

const openSearch = () => {
  searchOpen.value = true;
  mobileNavMenu.value = false;
};

const closeHandler = () => {
  translateDropdownOpen.value = false;
};

const mobileNavMenu = ref(false);

const isActive = (path: string) => {
  if (path.includes('components') && route.path.includes('elements')) return true
  return route.path.startsWith(path)
}

const searchShortcutHandler = (event: KeyboardEvent) => {
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;

  event.preventDefault();
  openSearch();
};

onMounted(() => {
  window.addEventListener("keydown", searchShortcutHandler);
});

onUnmounted(() => {
  window.removeEventListener("keydown", searchShortcutHandler);
});
</script>

<template>
  <header class="docs-top-bar nmorph--shadow-outset">
    <div class="docs-top-bar__left">
      <div class="docs-top-bar__logo">
        <NuxtLink :to="localePath('/')">
          <NmorphIcon width="40px">
            <NmorphIconLogo />
          </NmorphIcon>
        </NuxtLink>
      </div>
      <span class="docs-top-bar__version">v{{ libraryData.version }}</span>
    </div>
    <div class="docs-top-bar__right">
      <div
        class="docs-top-bar__search-control"
        @click="openSearch"
        @keydown.enter.prevent="openSearch"
        @keydown.space.prevent="openSearch"
      >
        <NmorphTextInput
          class="docs-top-bar__search-input"
          :model-value="''"
          :placeholder="$t('top-bar.search')"
          thickness="basic"
          :input-attrs="{ readonly: true, 'aria-label': $t('top-bar.search') }"
          @focus="openSearch"
        >
          <template #prepend-icon>
            <NmorphIconSearch />
          </template>
        </NmorphTextInput>
        <kbd>{{ $t("top-bar.search-shortcut") }}</kbd>
      </div>
      <NmorphLink :href="repositoryUrl" target="blank" class="github-button">
        <GithubIcon />
      </NmorphLink>
      <div ref="translateBtn" class="docs-top-bar__translate-btn">
        <NmorphCheckbox v-model="translateDropdownOpen" size="small" class="docs-top-bar__translate-checkbox"
          design="nmorph">
          <template #label>
            <NmorphIcon>
              <TranslateIcon />
            </NmorphIcon>
          </template>
        </NmorphCheckbox>
        <NmorphDropdown v-if="translateBtn" :fill-width="false" :open="translateDropdownOpen"
          :relative-element="translateBtn" @on-outside-click="closeHandler" :x-offset="-40" :y-offset="10" :width="100">
          <ul class="docs-translates__dropdown">
            <NuxtLink :to="switchLocalePath(localeData.code)" v-for="localeData in availableLocales"
              @click="closeHandler">
              {{ localeData.name }}</NuxtLink>
          </ul>
        </NmorphDropdown>
      </div>
      <nav class="docs-top-bar__nav">
        <ul class="docs-top-bar__nav-list">
          <li>
            <NuxtLink :class="{ 'docs-active-route': isActive(localePath('/guide')) }" :to="localePath('/guide')">
              {{
                $t("guide") }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :class="{ 'docs-active-route': isActive(localePath('/components')) }"
              :to="localePath('/components')">
              {{
                $t("components")
              }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :class="{ 'docs-active-route': isActive(localePath('/changelog')) }" :to="localePath('/changelog')">
              {{ $t("changelog-page.changelog.title") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :class="{ 'docs-active-route': isActive(localePath('/about')) }" :to="localePath('/about')">
              {{
                $t("about") }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <theme-changer />
      <NmorphCheckbox
        v-model="mobileNavMenu"
        class="docs-top-bar__nav-menu-btn"
        :aria-label="$t('top-bar.nav')"
        design="nmorph"
      >
        <template #label>
          <NmorphIcon>
            <NmorphIconMenu />
          </NmorphIcon>
        </template>
      </NmorphCheckbox>
    </div>
    <nav class="docs-top-bar__mobile-nav-menu" :class="{ 'docs-top-bar__mobile-nav-menu--open': mobileNavMenu }"
      @click="mobileNavMenu = false">
      <ul>
        <li>
          <NuxtLink :to="localePath('/guide')">{{
            $t("guide") }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/components')">{{
            $t("components")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/changelog')">{{
            $t("changelog-page.changelog.title") }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/about')">{{ $t("about") }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <SearchDialog v-model:open="searchOpen" />
  </header>
</template>

<style lang="scss" scoped>
$top-bar-height: 50px;

.nmorph-checkbox--nmorph.docs-top-bar__translate-checkbox {
  --size: 28px;
}

.docs-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: var(--header-height);
  margin: var(--margin) var(--docs-shell-surface-margin) 0;
  padding: 4px 20px;
  border-radius: 4px;
  background: var(--nmorph-main-color);
  box-shadow:
    var(--docs-layout-shadow-width) var(--docs-layout-shadow-width) var(--docs-layout-shadow-blur)
      var(--nmorph-dark-shade-color),
    calc(-1 * var(--docs-layout-shadow-width)) calc(-1 * var(--docs-layout-shadow-width))
      var(--docs-layout-shadow-blur) var(--nmorph-light-shade-color);
  z-index: 1;
}

.docs-top-bar__translate-btn {
  margin: 0 16px;
}

.github-button {
  :deep(svg) {
    width: 28px;
    height: 28px;
  }
}

.docs-top-bar__left {
  display: flex;
  align-items: center;
  height: 100%;
}

.docs-top-bar__logo {
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.docs-top-bar__version {
  margin-left: 8px;
  color: var(--nmorph-semi-contrast-text-color);
  font-size: var(--font-size-extra-small);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.docs-top-bar__right {
  display: flex;
  align-items: center;
}

.docs-top-bar__search-control {
  margin-right: 12px;
  position: relative;
  width: 184px;
  cursor: pointer;

  :deep(.docs-top-bar__search-input input) {
    cursor: pointer;
    padding-right: 58px;
  }

  kbd {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    padding: 2px 6px;
    border: 0;
    border-radius: 4px;
    color: var(--nmorph-semi-contrast-text-color);
    font-family: inherit;
    font-size: var(--font-size-extra-small);
    background: color-mix(in srgb, var(--nmorph-text-color) 8%, transparent);
  }
}

.docs-translates__dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    background: var(--nmorph-main-bg);
  }

  a {
    padding: 4px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  a:hover {
    background: var(--nmorph-accent-color);
    color: var(--nmorph-white-color);
  }

  a:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  a:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.docs-top-bar__nav-list .docs-active-route {
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

.docs-top-bar__nav-menu-btn {
  display: none;
}

.docs-top-bar__mobile-nav-menu {
  position: fixed;
  opacity: 0;
  bottom: 0;
  z-index: 2;
  transition: 0.2s bottom ease-in-out;
  left: 0;
  background: #0000009f;
  backdrop-filter: blur(10px);
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity ease-in-out .3s;
  pointer-events: none;

  ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  li {
    margin: 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--nmorph-white-color);
  }
}

.docs-top-bar__mobile-nav-menu--open {
  opacity: 1;
  transition: opacity ease-in-out .3s;
  pointer-events: visible;
}

@include max-width-query(768) {
  .docs-main-layout__left-aside {
    display: none;
  }

  .docs-main-layout {
    grid-template-columns: 1fr;
  }

  .docs-top-bar__nav {
    display: none;
  }

  .docs-top-bar__search-control {
    margin-right: 8px;
    width: 34px;

    kbd {
      display: none;
    }

    :deep(.docs-top-bar__search-input input) {
      padding-right: 8px;
    }
  }

  .docs-top-bar__nav-menu-btn {
    display: flex;
  }
}
</style>
