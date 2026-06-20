<script setup lang="ts">
import { NmorphScroll, NmorphCard, NmorphDivider } from "@nmorph/nmorph-ui-kit";
import { h } from "vue";

const knownBugItems: string[] = [];

const releaseDates: Record<string, string> = {
  "v3.0.13": "2026-06-20",
  "v3.0.12": "2026-06-20",
  "v3.0.11": "2026-06-14",
  "v3.0.10": "2026-06-13",
  "v3.0.9": "2026-06-13",
  "v3.0.8": "2026-06-12",
  "v3.0.7": "2026-06-12",
  "v3.0.6": "2026-06-12",
  "v3.0.5": "2026-06-11",
  "v3.0.3": "2026-06-07",
  "v3.0.2": "2026-06-07",
  "v3.0.1": "2026-06-06",
  "v3.0.0": "2026-06-06",
  "v2.2.59": "2026-06-04",
  "v2.2.58": "2026-06-04",
  "v2.2.57": "2026-06-02",
  "v2.2.56": "2026-06-02",
  "v2.2.54": "2026-06-01",
  "v2.2.53": "2026-06-01",
  "v2.2.52": "2026-05-31",
  "v2.2.51": "2026-05-31",
  "v2.2.48": "2026-05-31",
  "v2.2.43": "2026-05-27",
  "v2.2.42": "2026-05-27",
  "v2.2.40": "2026-05-26",
  "v2.2.39": "2026-05-25",
  "v2.2.38": "2026-05-23",
  "v2.2.37": "2026-05-22",
  "v2.2.36": "2026-05-22",
  "v2.2.35": "2026-05-21",
  "v2.2.34": "2026-05-20",
  "v2.2.33": "2026-05-20",
  "v2.2.32": "2026-05-19",
  "v2.2.31": "2026-05-19",
  "v2.2.30": "2026-05-19",
  "v2.2.29": "2026-05-19",
  "v2.2.28": "2026-05-19",
  "v2.2.27": "2026-05-19",
  "v2.2.26": "2026-05-19",
  "v2.2.25": "2026-05-19",
  "v2.2.24": "2026-05-19",
  "v2.2.23": "2026-05-18",
  "v2.2.22": "2026-05-18",
  "v2.2.21": "2026-05-18",
  "v2.2.20": "2026-05-12",
  "v2.2.19": "2026-05-11",
  "v2.2.18": "2026-05-10",
  "v2.2.17": "2026-05-10",
  "v2.2.16": "2026-05-10",
  "v2.2.15": "2026-05-10",
  "v2.2.14": "2026-05-10",
  "v2.2.13": "2026-05-10",
  "v2.2.12": "2026-05-09",
  "v2.2.11": "2026-05-09",
  "v2.2.10": "2026-05-09",
  "v2.2.9": "2026-05-09",
  "v2.2.8": "2026-05-09",
  "v2.2.7": "2026-05-08",
  "v2.2.6": "2026-05-08",
  "v2.2.5": "2026-05-08",
  "v2.2.4": "2026-05-07",
  "v2.2.3": "2026-05-07",
  "v2.2.2": "2026-05-07",
  "v2.2.1": "2026-05-06",
  "v2.2.0": "2026-05-06",
  "v2.1.1": "2026-05-05",
  "v2.1.0": "2026-05-05",
};

const ReleaseHeading = ({ version }: { version: string }) => {
  const date = releaseDates[version];

  return h("h3", { class: "docs-changelog-page__release-title" }, [
    h("span", version),
    date
      ? h(
          "time",
          {
            class: "docs-changelog-page__release-date",
            datetime: date,
          },
          date,
        )
      : null,
  ]);
};
</script>

<template>
  <div class="nmorph-docs-content docs-changelog-page">
    <NmorphCard class="docs-changelog-page__card" padding="0" :paper="3">
      <NmorphScroll class="docs-changelog-page__scroll" :y-gap-in-px="8">
        <div class="docs-changelog-page__content">
          <section id="changelog">
          <h2>{{ $t("changelog-page.changelog.title") }}</h2>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.13" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.button-loading-icon-size") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.icon-cross-alignment") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.accent-option-contrast") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.error-box-spacing") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.12" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.guide-target-outline-color") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.error-box-multiline-layout") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-repository-browser-links") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.11" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.github-actions-pages-publish") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-custom-domain") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.button-text-slot-alignment") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.guide-bordered-popup-surface") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.tooltip-popup-surface-controls") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.10" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.guide-bordered-prop") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.guide-plain-actions") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.9" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.component-colocated-stories-tests") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.public-type-barrels-emoji-entrypoints") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-example-workflow-cleanup") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.dev-workflow-cleanup") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.component-control-polish") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.8" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.legacy-cleanup-public-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.media-tile-aspect-design") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.carousel-seamless-loop") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.notification-provider-layering") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-api-example-polish") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.7" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.media-tile-stable-src-object-binding") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.pagination-fixed-container-sizing") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.table-plain-bordered-contract") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.drawer-animation-sandbox-example") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.image-preview-docs-polish") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.6" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.media-tile-src-object-audio-output") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.hydration-navigation-stability") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.media-preview-state-polish") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.file-card-loading-layout") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-guide-shell-polish") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.5" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.card-paper-surface") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.media-tile-audio-sink") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-paper-shell") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.component-api-docs-refresh") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.interaction-polish") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.3" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.docs-layout-refresh") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.overview-preview-polish") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.loading-icon-states") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.media-gallery-trigger-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.scroll-progress-polish") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.audio-backtop-polish") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.2" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.avatar-borderless-prop") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.badge-tag-value-slot") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.preview-borderless-controls") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.image-preview-plain-surface") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.hand-icon-outline") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.1" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.button-borderless-prop") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.media-tile-show-status") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.select-button-custom-thickness") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.speaker-icons") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.media-tile-plain-avatar") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v3.0.0" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.design-api-plain") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.selection-design-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.form-control-design-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.component-thickness-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.thin-input-centering") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.control-typography-contract") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.typography-system") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.plain-surface-contract") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.component-css-vars-private-api") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.stepper-single-item-click") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.59" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.guide-component") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.stepper-component") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.audio-meter-equal-bars") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.58" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.divider-original-styling",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.57" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.divider-vertical-visibility",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.56" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-card-actions-slot-align",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.video-playback-full-buffer",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.54" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.media-card-visibility-sizing",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.53" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.media-gallery-file-card-triggers",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-card-preview-mode",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.sandbox-media-downloads",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.52" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-card-image-media-preview",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.media-gallery-mixed-preview",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.preview-portal-shared-flow",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.51" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.video-preview-overlay-actions",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.attachment-actions-polish",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-card-sandbox-all-types",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.48" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.attachment-preview-primitives",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-upload-attachment-previews",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.attachment-rendering-notes")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.emoji-picker-lazy-locales")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.link-anchor-attrs") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.callout-rich-link-slots") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.file-card-embedded-surface") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.attachment-preview-embedded-controls",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-card-audio-media-preview",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.notification-duration-value-toggle",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.43" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.image-preview-keyboard-navigation",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.icon-wrapper-centering")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.scroll-runtime-skin")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.42" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.tag-list-common-color-api")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.tag-list-custom-content")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.realtime-ui-components-api")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.context-menu-repeat-right-click",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.text-input-prepend-placeholder-color",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.40" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.context-menu-open-controls")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.image-preview-gallery-trigger",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.button-multiline-height")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.tag-list-common-design")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.39" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.component-types-split")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.file-upload-type-helpers")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.image-preview-lazy-portal")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.badge-larger-sizes")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.38" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.form-item-model-binding")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.file-upload-form-rules")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.form-controls-visual-polish",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.dev-open-opt-in-browser")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.37" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.style-utils-unification")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.virtual-list-style-helpers",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.dialog-overlay-close-api")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.component-local-style-split")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.36" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.new-components-suite") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.new-components-docs-sandbox",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.expanded-icon-set") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.component-polish-round")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.docs-api-inline-descriptions",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.35" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.avatar-initials-text-color",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.empty-padding-token")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.docs-collapse-title-scope",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.sandbox-table-border-color",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.docs-skeleton-loading-example",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.docs-css-type-links")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.dropdown-hide-shadow-prop",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.backtop-teleport-styles")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-void-expose-types") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-left-aside-scroll") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.form-menu-option-height")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-upload-all-file-types",
                  )
                }}
              </li>
              <li>{{ $t("changelog-page.changelog.items.pin-icon") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.34" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.link-icon-name-prop") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.avatar-loader-text-color")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.badge-flat-ribbon-radius")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-api-type-links") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.docs-example-english-source",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.nuxt-build-dir-isolation")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.33" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.file-upload-controlled-reset",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.32" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.badge-ribbon-inner-radius-tiny",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.31" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.badge-ribbon-tilt") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.callout-size-props") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.30" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.file-upload-truncate-grid")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.29" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.image-preview-closed-portal",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.file-upload-preview-flex")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.dialog-indentation-03-padding",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.28" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.dialog-content-overflow-x")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.27" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.badge-hide-on-falsy-value")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.26" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.badge-dot-css-variable")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.card-content-class-prop")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.dialog-compact-section-padding",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.sandbox-component-examples",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.25" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.badge-type-display-source")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.24" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.badge-ribbon-type") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.notification-provider-z-index-stack",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.dialog-viewport-scroll")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.sandbox-source-aliases")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.23" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.scroll-gap-defaults") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.image-preview-click-through",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-localhost-open") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.autocomplete-close-clear-spacing",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.22" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.smile-icon") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.21" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.send-icons") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.message-action-icons") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.empty-border-box") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.image-preview-control-visibility",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.20" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.card-header-slot-wrapper")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.card-combined-border-style",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.19" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.empty-state-component") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.card-padding-prop") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.card-fill-prop") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.card-tag-prop") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.css-variable-prop-overrides",
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.context-menu-neutral-hover",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.tooltip-z-index-stack") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.notification-provider-first-animation",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.carousel-collapse-docs")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.time-picker-component") }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.image-preview-overlay-fit")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.compact-sandbox-visual-fixes",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.dev-open-workflow") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.18" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.context-menu-options-api")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.context-menu-scroll-position",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.sandbox-nuxt-migration")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.17" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.context-menu-trigger-modes",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.badge-min-width") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.nuxt-hydration-warning-cleanup",
                  )
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.16" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.docs-route-lazy-overviews")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.library-entrypoints-tree-shaking",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.context-menu-component")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.overlay-focus-management")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.virtualization-keyboard-dynamic-height",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.date-format-flexibility")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.button-custom-color-hover")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.css-shadow-token-cleanup")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.15" />
            <ul>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.image-preview-fullscreen-controls",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.docs-example-source-files")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.docs-code-copy-fix") }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.callout-docs-bottom-spacing",
                  )
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.storybook-sass-modern-api")
                }}
              </li>
              <li>
                {{
                  $t(
                    "changelog-page.changelog.items.workspace-dev-script-fixes",
                  )
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.ci-pnpm-publish") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.14" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.nuxt-theme-first-paint")
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
                  $t("changelog-page.changelog.items.ios-input-scrollbar-fixes")
                }}
              </li>
              <li>
                {{
                  $t("changelog-page.changelog.items.pnpm-turbo-docs-refresh")
                }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.13" />
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
                  $t("changelog-page.changelog.items.nuxt-ssr-theme-runtime")
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
            <ReleaseHeading version="v2.2.12" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.pagination-basic-height")
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
                {{ $t("changelog-page.changelog.items.nuxt-i18n-merge") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.11" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.avatar-preview-resolve")
                }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.backtop-contrast-icon") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.10" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.component-css-splitting")
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
            <ReleaseHeading version="v2.2.9" />
            <ul>
              <li>
                {{
                  $t("changelog-page.changelog.items.remove-styled-components")
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
            <ReleaseHeading version="v2.2.8" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.nuxt-module") }}
              </li>
              <li>
                {{ $t("changelog-page.changelog.items.image-preview-portal") }}
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
            <ReleaseHeading version="v2.2.7" />
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
            <ReleaseHeading version="v2.2.6" />
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
            <ReleaseHeading version="v2.2.5" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.checkbox-height") }}
              </li>
              <li>{{ $t("changelog-page.changelog.items.radio-height") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.4" />
            <ul>
              <li>{{ $t("changelog-page.changelog.items.avatar-preview") }}</li>
              <li>
                {{ $t("changelog-page.changelog.items.callout-spacing") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.3" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.media-control-icons") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v2.2.2" />
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
            <ReleaseHeading version="v2.2.1" />
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
            <ReleaseHeading version="v2.2.0" />
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
            <ReleaseHeading version="v2.1.1" />
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
            <ReleaseHeading version="v2.1.0" />
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
            <ReleaseHeading version="v2.0.3" />
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
            <ReleaseHeading version="v2.0.2" />
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
            <ReleaseHeading version="v2.0.1" />
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
            <ReleaseHeading version="v2.0.0" />
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
            <ReleaseHeading version="v1.1.6" />
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
            <ReleaseHeading version="v1.1.5" />
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
            <ReleaseHeading version="v1.1.4" />
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
            <ReleaseHeading version="v1.1.3" />
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
            <ReleaseHeading version="v1.1.2" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.validation-icon-fix") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v1.1.1" />
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
            <ReleaseHeading version="v1.1.0" />
            <ul>
              <li>{{ $t("changelog-page.changelog.items.select-button") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v1.0.107" />
            <ul>
              <li>{{ $t("changelog-page.changelog.items.engines-range") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v1.0.106" />
            <ul>
              <li>
                {{ $t("changelog-page.changelog.items.export-en-locale") }}
              </li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <ReleaseHeading version="v1.0.105" />
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
        </div>
      </NmorphScroll>
    </NmorphCard>
  </div>
</template>

<style scoped lang="scss">
.docs-changelog-page {
  padding: var(--docs-layout-shadow-space);
}

.docs-changelog-page__card {
  height: 100%;
  min-height: 0;
}

.docs-changelog-page__scroll {
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
}

.docs-changelog-page__content {
  box-sizing: border-box;
  min-height: 100%;
  padding: var(--docs-content-padding);
  padding-bottom: calc(var(--docs-content-padding) + var(--docs-layout-shadow-space));
}

.docs-changelog-page :deep(.nmorph-card__content) {
  height: 100%;
  min-height: 0;
}

.docs-changelog-page {
  section {
    margin-bottom: 12px;
  }

  h2 {
    margin: 0 0 10px;
  }

  h3 {
    margin: 0 0 8px;
  }

  .docs-changelog-page__release + .docs-changelog-page__release {
    margin-top: 36px;
  }

  :deep(.docs-changelog-page__release-title) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    align-items: baseline;
  }

  :deep(.docs-changelog-page__release-date) {
    color: var(--nmorph-semi-contrast-text-color);
    font-weight: var(--nmorph-typography-body-small-font-weight);
    font-size: var(--nmorph-typography-body-small-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
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
