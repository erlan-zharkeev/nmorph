<script setup lang="ts">
import {
  NmorphIcon,
  NmorphLink,
  NmorphDropdown,
  NmorphCheckbox,
  NmorphIconMenu,
  NmorphIconLogo,
} from "@nmorph/nmorph-ui-kit";
import TranslateIcon from "~/assets/icons/translate.svg";
import GitlabIcon from "~/assets/icons/gitlab.svg";
import type { LocaleObject } from "@nuxtjs/i18n";

const switchLocalePath = useSwitchLocalePath();

const { locales, locale } = useI18n();
const route = useRoute();

const availableLocales = computed<LocaleObject[]>(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

interface IProps {
  isMenuOpen: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});

interface INmorphEmit {
  (e: "toggle-menu"): void;
  (e: "close-menu"): void;
}
const emit = defineEmits<INmorphEmit>();

const localePath = useLocalePath();

const translateBtn = ref(null);
const translateDropdownOpen = ref(false);

const closeHandler = () => {
  translateDropdownOpen.value = false;
};

const updateMenuHandler = () => {
  emit("toggle-menu");
};

const mobileNavMenu = ref(false);
const toggleMobileNavMenu = () => {
  mobileNavMenu.value = !mobileNavMenu.value;
  if (mobileNavMenu.value) emit('close-menu')
};

const isRootPage = computed(() => route.path.length <= 3);
watch(() => props.isMenuOpen, () => {
  mobileNavMenu.value = false
})
const isActive = (path: string) => {
  if (path.includes('components') && route.path.includes('elements')) return true
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="docs-top-bar nmorph--shadow-outset">
    <div class="docs-top-bar__left">
      <NmorphCheckbox class="docs-top-bar__menu" :model-value="props.isMenuOpen" @update:model-value="updateMenuHandler"
        v-if="!isRootPage" design="button">
        <template #label>
          <NmorphIcon>
            <NmorphIconMenu />
          </NmorphIcon>
        </template>
      </NmorphCheckbox>
      <div class="docs-top-bar__logo">
        <NuxtLink :to="localePath('/')">
          <ClientOnly>
            <NmorphIcon width="40px">
              <NmorphIconLogo />
            </NmorphIcon>
          </ClientOnly>
        </NuxtLink>
      </div>
    </div>
    <div class="docs-top-bar__right">
      <NmorphLink href="https://gitlab.com/ketjo/nmorph" target="blank" class="git-lab-button">
        <GitlabIcon />
      </NmorphLink>
      <div ref="translateBtn" class="docs-top-bar__translate-btn">
        <NmorphCheckbox v-model="translateDropdownOpen" size="small" class="docs-top-bar__translate-checkbox"
          design="button">
          <template #label>
            <ClientOnly>
              <NmorphIcon>
                <TranslateIcon />
              </NmorphIcon>
            </ClientOnly>
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
              Changelog
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
      <NmorphCheckbox class="docs-top-bar__nav-menu-btn" :model-value="mobileNavMenu"
        @update:model-value="toggleMobileNavMenu" :label="$t('top-bar.nav')" design="button" />
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
          <NuxtLink :to="localePath('/about')">{{ $t("about") }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
$top-bar-height: 50px;

.nmorph-checkbox--button.docs-top-bar__translate-checkbox {
  --size: 28px;
}

.docs-top-bar {
  height: $top-bar-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px;
  z-index: 1;
}

.docs-top-bar__translate-btn {
  cursor: pointer;
  margin-left: 16px;
  margin-right: 16px;
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

.docs-top-bar__menu {
  --size: 28px;
  display: none;
  margin-right: 8px;
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

  .docs-top-bar__menu {
    display: block;
    width: 28px;
  }

  .docs-top-bar__nav {
    display: none;
  }

  .docs-top-bar__nav-menu-btn {
    display: flex;
  }
}
</style>
