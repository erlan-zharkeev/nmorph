<script setup lang="ts">
import { NmorphScroll, NmorphCard, NmorphDivider } from "@nmorph/nmorph-ui-kit";

const knownBugItems: string[] = [];
</script>

<template>
  <div class="nmorph-docs-content docs-changelog-page">
    <NmorphCard>
      <NmorphScroll class="docs-changelog-page__scroll">
        <section id="changelog">
          <h2>{{ $t("changelog-page.changelog.title") }}</h2>
          <div class="docs-changelog-page__release">
            <h3>v2.2.19</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.context-menu-neutral-hover") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.18</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.context-menu-options-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.context-menu-scroll-position") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.sandbox-nuxt-migration") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.17</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.context-menu-trigger-modes") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.badge-min-width") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.nuxt-hydration-warning-cleanup") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.16</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.docs-route-lazy-overviews") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.library-entrypoints-tree-shaking") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.context-menu-component") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.overlay-focus-management") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.virtualization-keyboard-dynamic-height") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.date-format-flexibility") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.button-custom-color-hover") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.css-shadow-token-cleanup") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.15</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.docs-example-source-files",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.docs-code-copy-fix",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.callout-default-bottom-spacing",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.storybook-sass-modern-api",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.ci-pnpm-publish",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.14</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.nuxt-theme-first-paint",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.backtop-teleport-safe-area",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.ios-input-scrollbar-fixes",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.pnpm-turbo-docs-refresh",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.13</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.virtualized-table-select-autocomplete",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.overlay-dropdown-teleport-placement",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.nuxt-ssr-theme-runtime",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.compact-control-visual-fixes",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.12</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.pagination-basic-height",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.checkbox-radio-button-controls",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.avatar-image-preview-cleanup",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.nuxt-i18n-merge",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.11</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.avatar-preview-resolve",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.backtop-contrast-icon",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.10</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.component-css-splitting",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.plugin-entry-styles-option",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.9</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.remove-styled-components",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.avatar-text-input-visual-fixes",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.8</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.nuxt-module") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.image-preview-portal")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.text-input-prepend-icon")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-actions-align") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.7</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.height-basic-name") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.checkbox-radio-defaults")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.text-input-clear-space")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.6</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.overlay-z-index-stack") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.overlay-z-index-props") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.5</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.checkbox-height") }}
              </li>
              <li>{{ $t("changelog-page.changelog.items.radio-height") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.4</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.avatar-preview") }}</li>
              <li>
                {{ $t("changelog-page.changelog.items.callout-spacing") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.3</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.media-control-icons") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.2</h3>
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.select-fill-options-width")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.select-loading-disabled")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.dropdown-size-css-values")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.form-control-transition-cleanup",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.1</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.callout-status-types") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.theme-runtime-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.theme-options-typing") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.2.0</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.callout-component") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.select-button-fill") }}
              </li>
              <li>{{ $t("changelog-page.changelog.items.badge-size") }}</li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.guide-css-variables-utilities",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.docs-mobile-menu-fit-content",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.1.1</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.badge-z-index") }}</li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.color-picker-display-format",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-upload-model-custom-data",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.slider-pointer-events") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.scroll-thumb-theme-color")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.1.0</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.avatar-name-initials") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.notification-provider-placement-per-notification",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.notification-provider-quantity-leave-style",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.button-transparent-hover-icons",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.color-picker-fixed-value-width",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.0.3</h3>
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.scroll-default-height-100")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.scroll-typing-fixes") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.0.2</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.notification-provider-close-animation",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.notification-provider-uuid-ids",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.0.1</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.otp-input-component") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.form-autocomplete-forwarding",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.text-input-composition-api",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.avatar-fallback-prop") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.button-fill-transparent-color",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v2.0.0</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.button-icon-slots-breaking",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.badge-value-slot") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.scroll-height-100") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.theme-config-contrast-types",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.select-button-no-theme-transition",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.radio-optional-inject-types",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.6</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.color-picker") }}</li>
              <li>{{ $t("changelog-page.changelog.items.badge-tag-mode") }}</li>
              <li>
                {{
                  $t("changelog-page.changelog.items.badge-undefined-hidden")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.exit-users-icons") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.form-boolean-compare") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.image-src-optional") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.5</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.select-button-keyboard-focus",
                  )
                }}
              </li>
              <li>{{ $t("changelog-page.changelog.items.tabindex-prop") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.4</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.form-item-input-inheritance",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.text-input-autofill-styles",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.3</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.google-icon") }}</li>
              <li>
                {{ $t("changelog-page.changelog.items.contrast-text-colors") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.form-item-label-for") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.error-box-single-error")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.2</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.validation-icon-fix") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.1</h3>
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.select-button-unselected-opacity",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.0</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.select-button") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.0.107</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.engines-range") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.0.106</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.export-en-locale") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.0.105</h3>
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.skeleton-animation") }}
              </li>
            </ul>
          </div>
        </section>
        <NmorphDivider v-if="knownBugItems.length" />
        <section v-if="knownBugItems.length" id="known-bugs">
          <h2>{{ $t("changelog-page.known-bugs.title") }}</h2>
          <ul>
            <li v-for="knownBugItem in knownBugItems" :key="knownBugItem">
              {{ $t(`changelog-page.known-bugs.items.${knownBugItem}`) }}
            </li>
          </ul>
        </section>
      </NmorphScroll>
    </NmorphCard>
  </div>
</template>

<style scoped lang="scss">
.docs-changelog-page__scroll {
  padding: 4px;
  height: calc(var(--container-height) - 32px) !important;
}

.nmorph-card {
  height: 100%;
}

.docs-changelog-page {
  section {
    margin-bottom: 12px;
  }

  h2 {
    margin-bottom: 10px;
  }

  h3 {
    margin: 0 0 8px;
  }

  p,
  li {
    line-height: 1.5;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }
}
</style>
