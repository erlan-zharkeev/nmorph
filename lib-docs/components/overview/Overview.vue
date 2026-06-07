<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";

const { t } = useI18n();
const localePath = useLocalePath();
const previewParts = Array.from({ length: 16 }, (_, index) => index + 1);

const overviewComponents = [
  { title: "Button", path: "button", preview: "button" },
  { title: "Icon", path: "icon", preview: "icon" },
  { title: "Link", path: "link", preview: "link" },
  { title: "Text", path: "text", preview: "text" },
  { title: "Space", path: "space", preview: "space" },
  { title: "Layout", path: "layout", preview: "layout" },
  { title: "Scroll", path: "scroll", preview: "scroll" },
  { title: "Avatar", path: "avatar", preview: "avatar" },
  { title: "Badge", path: "badge", preview: "badge" },
  { title: "Card", path: "card", preview: "card" },
  { title: "Empty", path: "empty", preview: "empty" },
  { title: "Image", path: "image", preview: "image" },
  { title: "Image Preview", path: "image-preview", preview: "image-preview" },
  { title: "Media Gallery", path: "media-gallery", preview: "media-gallery" },
  { title: "Media Tile", path: "media-tile", preview: "media-tile" },
  { title: "File Card", path: "file-card", preview: "file-card" },
  { title: "Audio Preview", path: "audio-preview", preview: "audio-preview" },
  { title: "Video Preview", path: "video-preview", preview: "video-preview" },
  { title: "Audio Meter", path: "audio-meter", preview: "audio-meter" },
  { title: "Tag List", path: "tag-list", preview: "tag-list" },
  { title: "Tag Item", path: "tag-item", preview: "tag-item" },
  { title: "Skeleton", path: "skeleton", preview: "skeleton" },
  { title: "Progress", path: "progress", preview: "progress" },
  { title: "Table", path: "table", preview: "table" },
  { title: "Virtual List", path: "virtual-list", preview: "virtual-list" },
  { title: "QR Code", path: "qr-code", preview: "qr-code" },
  { title: "Carousel", path: "carousel", preview: "carousel" },
  { title: "Collapse", path: "collapse", preview: "collapse" },
  { title: "Divider", path: "divider", preview: "divider" },
  { title: "Breadcrumb", path: "breadcrumb", preview: "breadcrumb" },
  { title: "Text Input", path: "text-input", preview: "text-input" },
  { title: "Textarea", path: "textarea", preview: "textarea" },
  { title: "Color Picker", path: "color-picker", preview: "color-picker" },
  { title: "Switch", path: "switch", preview: "switch" },
  { title: "Checkbox", path: "checkbox", preview: "checkbox" },
  { title: "Checkbox Group", path: "checkbox-group", preview: "checkbox-group" },
  { title: "Radio", path: "radio", preview: "radio" },
  { title: "Radio Group", path: "radio-group", preview: "radio-group" },
  { title: "Select Button", path: "select-button", preview: "select-button" },
  { title: "Autocomplete", path: "autocomplete", preview: "autocomplete" },
  { title: "File Upload", path: "file-upload", preview: "file-upload" },
  { title: "Slider", path: "slider", preview: "slider" },
  { title: "Number Input", path: "number-input", preview: "number-input" },
  { title: "Select", path: "select", preview: "select" },
  { title: "Date Picker", path: "date-picker", preview: "date-picker" },
  { title: "Time Picker", path: "time-picker", preview: "time-picker" },
  { title: "OTP Input", path: "otp-input", preview: "otp-input" },
  { title: "Calendar", path: "calendar", preview: "calendar" },
  { title: "Tabs", path: "tabs", preview: "tabs" },
  { title: "Pagination", path: "pagination", preview: "pagination" },
  { title: "Stepper", path: "stepper", preview: "stepper" },
  { title: "Dropdown", path: "dropdown", preview: "dropdown" },
  { title: "Context Menu", path: "context-menu", preview: "context-menu" },
  { title: "Backtop", path: "backtop", preview: "backtop" },
  { title: "Alert", path: "alert", preview: "alert" },
  { title: "Callout", path: "callout", preview: "callout" },
  { title: "Tooltip", path: "tooltip", preview: "tooltip" },
  { title: "Overlay", path: "overlay", preview: "overlay" },
  { title: "Dialog", path: "dialog", preview: "dialog" },
  { title: "Drawer", path: "drawer", preview: "drawer" },
  { title: "Notification", path: "notification-provider", preview: "notification" },
  { title: "Form", path: "form", preview: "form" },
  { title: "Emoji Picker", path: "emoji-picker", preview: "emoji-picker" },
  { title: "Guide", path: "guide", preview: "guide" },
  { title: "Guide Step", path: "guide-step", preview: "guide-step" },
];
</script>

<template>
  <div class="overview">
    <div class="nmorph-title-1 overview__title">
      {{ t("overview.explore-components") }}
    </div>
    <div class="overview-component-list">
      <div v-for="component in overviewComponents" :key="component.path" class="overview-component-wrapper">
        <NuxtLink :to="localePath(`/elements/${component.path}`)">
          <NmorphCard>
            <template #header>{{ component.title }}</template>
            <div class="overview-component-content">
              <div class="overview-preview" :class="`overview-preview--${component.preview}`" aria-hidden="true">
                <span v-for="part in previewParts" :key="part" class="overview-preview__part" />
              </div>
            </div>
          </NmorphCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.overview {
  .nmorph-card {
    pointer-events: none;
  }

  .overview__title {
    margin-bottom: var(--docs-content-padding);
  }

  .overview-component-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .overview-component-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .nmorph-card__content {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 20px 18px;
  }

  .overview-component-wrapper {
    height: 200px;

    .nmorph-card {
      height: 100%;
    }
  }

  .overview-preview {
    --overview-preview-muted: color-mix(in srgb, var(--nmorph-text-color) 18%, transparent);
    --overview-preview-soft: color-mix(in srgb, var(--nmorph-text-color) 11%, transparent);
    --overview-preview-faint: color-mix(in srgb, var(--nmorph-text-color) 7%, transparent);
    --overview-preview-accent-soft: color-mix(in srgb, var(--nmorph-accent-color) 58%, transparent);

    position: relative;
    width: min(220px, 100%);
    height: 128px;
    color: var(--nmorph-text-color);
  }

  .overview-preview__part {
    position: absolute;
    display: none;
    border-radius: var(--border-radius-40);
    background: var(--overview-preview-muted);
  }

  .overview-preview--button {
    .overview-preview__part:nth-child(1) {
      top: 46px;
      left: 50%;
      display: block;
      width: 96px;
      height: 38px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 61px;
      left: 50%;
      display: block;
      width: 42px;
      height: 8px;
      background: var(--nmorph-accent-color);
      transform: translateX(-50%);
    }
  }

  .overview-preview--icon {
    .overview-preview__part:nth-child(1) {
      top: 30px;
      left: 50%;
      display: block;
      width: 70px;
      height: 70px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      top: 63px;
      left: 50%;
      display: block;
      width: 34px;
      height: 4px;
      background: var(--nmorph-accent-color);
      transform-origin: center;
    }

    .overview-preview__part:nth-child(2) {
      transform: translateX(-50%) rotate(45deg);
    }

    .overview-preview__part:nth-child(3) {
      transform: translateX(-50%) rotate(-45deg);
    }
  }

  .overview-preview--link {
    .overview-preview__part:nth-child(1) {
      top: 52px;
      left: 50%;
      display: block;
      width: 118px;
      height: 15px;
      background: var(--overview-preview-muted);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 75px;
      left: 50%;
      display: block;
      width: 118px;
      height: 3px;
      background: var(--nmorph-accent-color);
      transform: translateX(-50%);
    }
  }

  .overview-preview--text {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      left: 36px;
      display: block;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(1) {
      top: 34px;
      width: 128px;
      height: 17px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(2) {
      top: 62px;
      width: 156px;
      height: 9px;
    }

    .overview-preview__part:nth-child(3) {
      top: 82px;
      width: 94px;
      height: 9px;
    }
  }

  .overview-preview--space {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      top: 48px;
      display: block;
      width: 38px;
      height: 38px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(1) {
      left: 30px;
    }

    .overview-preview__part:nth-child(2) {
      left: 86px;
    }

    .overview-preview__part:nth-child(3) {
      left: 142px;
    }
  }

  .overview-preview--layout {
    .overview-preview__part:nth-child(1) {
      top: 22px;
      left: 22px;
      display: block;
      width: 176px;
      height: 96px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 36px;
      left: 36px;
      display: block;
      width: 44px;
      height: 68px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(3) {
      top: 36px;
      left: 92px;
      display: block;
      width: 84px;
      height: 68px;
      background: var(--overview-preview-muted);
    }
  }

  .overview-preview--scroll,
  .overview-preview--virtual-list {
    .overview-preview__part:nth-child(1) {
      inset: 16px 28px;
      display: block;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6) {
      left: 48px;
      display: block;
      width: 104px;
      height: 8px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(2) {
      top: 34px;
    }

    .overview-preview__part:nth-child(3) {
      top: 50px;
      width: 126px;
    }

    .overview-preview__part:nth-child(4) {
      top: 66px;
      width: 92px;
    }

    .overview-preview__part:nth-child(5) {
      top: 82px;
      width: 116px;
    }

    .overview-preview__part:nth-child(6) {
      top: 98px;
      width: 72px;
    }

    .overview-preview__part:nth-child(7) {
      top: 30px;
      right: 34px;
      display: block;
      width: 6px;
      height: 54px;
      border-radius: var(--border-radius-999);
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--avatar {
    .overview-preview__part:nth-child(1) {
      top: 26px;
      left: 50%;
      display: block;
      width: 76px;
      height: 76px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 48px;
      left: 50%;
      display: block;
      width: 28px;
      height: 28px;
      border-radius: var(--border-radius-circular);
      background: var(--overview-preview-muted);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3) {
      top: 80px;
      left: 50%;
      display: block;
      width: 48px;
      height: 18px;
      border-radius: var(--border-radius-circular);
      background: var(--overview-preview-muted);
      transform: translateX(-50%);
    }
  }

  .overview-preview--badge {
    .overview-preview__part:nth-child(1) {
      top: 48px;
      left: 50%;
      display: block;
      width: 92px;
      height: 36px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 38px;
      left: calc(50% + 28px);
      display: block;
      width: 24px;
      height: 24px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-accent-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(3) {
      top: 63px;
      left: 50%;
      display: block;
      width: 38px;
      height: 7px;
      background: var(--overview-preview-muted);
      transform: translateX(-50%);
    }
  }

  .overview-preview--card {
    .overview-preview__part:nth-child(1) {
      top: 24px;
      left: 50%;
      display: block;
      width: 132px;
      height: 90px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 36px;
      left: 50%;
      display: block;
      width: 100px;
      height: 38px;
      background: var(--overview-preview-accent-soft);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      left: 72px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3) {
      top: 86px;
      width: 76px;
    }

    .overview-preview__part:nth-child(4) {
      top: 100px;
      width: 48px;
    }
  }

  .overview-preview--empty {
    .overview-preview__part:nth-child(1) {
      top: 36px;
      left: 50%;
      display: block;
      width: 96px;
      height: 64px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-inset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 52px;
      left: 50%;
      display: block;
      width: 38px;
      height: 7px;
      background: var(--overview-preview-muted);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3) {
      display: none;
    }

    .overview-preview__part:nth-child(n + 4) {
      display: none;
    }
  }

  .overview-preview--image,
  .overview-preview--image-preview,
  .overview-preview--video-preview {
    .overview-preview__part:nth-child(1) {
      top: 22px;
      left: 50%;
      display: block;
      width: 148px;
      height: 92px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-inset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      right: 54px;
      bottom: 36px;
      display: block;
      width: 74px;
      height: 44px;
      background: var(--overview-preview-accent-soft);
      clip-path: polygon(0 100%, 36% 34%, 58% 66%, 76% 42%, 100% 100%);
    }

    .overview-preview__part:nth-child(3) {
      top: 36px;
      right: 58px;
      display: block;
      width: 18px;
      height: 18px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--image-preview {
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5) {
      top: 50%;
      display: block;
      width: 26px;
      height: 26px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateY(-50%);
    }

    .overview-preview__part:nth-child(4) {
      left: 24px;
    }

    .overview-preview__part:nth-child(5) {
      right: 24px;
    }
  }

  .overview-preview--video-preview {
    .overview-preview__part:nth-child(4) {
      top: 52px;
      left: 50%;
      display: block;
      width: 34px;
      height: 34px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(5) {
      top: 62px;
      left: calc(50% - 3px);
      display: block;
      width: 14px;
      height: 14px;
      background: var(--nmorph-accent-color);
      clip-path: polygon(0 0, 100% 50%, 0 100%);
    }
  }

  .overview-preview--media-gallery {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      display: block;
      background: var(--overview-preview-muted);
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(1) {
      top: 24px;
      left: 36px;
      width: 76px;
      height: 76px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(2) {
      top: 24px;
      left: 122px;
      width: 52px;
      height: 36px;
    }

    .overview-preview__part:nth-child(3) {
      top: 70px;
      left: 122px;
      width: 52px;
      height: 30px;
    }

    .overview-preview__part:nth-child(4) {
      top: 24px;
      left: 184px;
      width: 14px;
      height: 76px;
      opacity: 0.55;
    }
  }

  .overview-preview--media-tile {
    .overview-preview__part:nth-child(1) {
      inset: 20px 34px;
      display: block;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 38px;
      left: 50%;
      display: block;
      width: 42px;
      height: 42px;
      border-radius: var(--border-radius-circular);
      background: var(--overview-preview-accent-soft);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3) {
      right: 46px;
      bottom: 30px;
      display: block;
      width: 50px;
      height: 8px;
      background: var(--overview-preview-muted);
    }
  }

  .overview-preview--file-card {
    .overview-preview__part:nth-child(1) {
      top: 30px;
      left: 50%;
      display: block;
      width: 126px;
      height: 70px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 44px;
      left: 62px;
      display: block;
      width: 34px;
      height: 42px;
      background: var(--overview-preview-accent-soft);
      clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      left: 108px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3) {
      top: 52px;
      width: 54px;
    }

    .overview-preview__part:nth-child(4) {
      top: 70px;
      width: 38px;
    }
  }

  .overview-preview--audio-preview {
    .overview-preview__part:nth-child(1) {
      top: 46px;
      left: 30px;
      display: block;
      width: 36px;
      height: 36px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(2) {
      top: 64px;
      left: 48px;
      display: block;
      width: 14px;
      height: 14px;
      background: var(--nmorph-accent-color);
      clip-path: polygon(0 0, 100% 50%, 0 100%);
      transform: translate(-38%, -50%);
    }

    .overview-preview__part:nth-child(n + 3):nth-child(-n + 10) {
      bottom: 44px;
      display: block;
      width: 6px;
      border-radius: var(--border-radius-999);
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(3) {
      left: 86px;
      height: 18px;
    }

    .overview-preview__part:nth-child(4) {
      left: 98px;
      height: 34px;
    }

    .overview-preview__part:nth-child(5) {
      left: 110px;
      height: 24px;
    }

    .overview-preview__part:nth-child(6) {
      left: 122px;
      height: 42px;
    }

    .overview-preview__part:nth-child(7) {
      left: 134px;
      height: 28px;
    }

    .overview-preview__part:nth-child(8) {
      left: 146px;
      height: 36px;
    }

    .overview-preview__part:nth-child(9) {
      left: 158px;
      height: 20px;
    }

    .overview-preview__part:nth-child(10) {
      left: 170px;
      height: 30px;
    }
  }

  .overview-preview--audio-meter {
    .overview-preview__part:nth-child(n + 1):nth-child(-n + 8) {
      bottom: 28px;
      display: block;
      width: 12px;
      border-radius: var(--border-radius-999);
      background: var(--overview-preview-accent-soft);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(1) {
      left: 42px;
      height: 28px;
    }

    .overview-preview__part:nth-child(2) {
      left: 62px;
      height: 48px;
    }

    .overview-preview__part:nth-child(3) {
      left: 82px;
      height: 72px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(4) {
      left: 102px;
      height: 58px;
    }

    .overview-preview__part:nth-child(5) {
      left: 122px;
      height: 84px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(6) {
      left: 142px;
      height: 54px;
    }

    .overview-preview__part:nth-child(7) {
      left: 162px;
      height: 34px;
    }

    .overview-preview__part:nth-child(8) {
      left: 182px;
      height: 64px;
    }
  }

  .overview-preview--tag-list,
  .overview-preview--tag-item {
    .overview-preview__part:nth-child(n + 1):nth-child(-n + 5) {
      display: block;
      height: 26px;
      border-radius: var(--border-radius-999);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(1) {
      top: 32px;
      left: 34px;
      width: 74px;
    }

    .overview-preview__part:nth-child(2) {
      top: 32px;
      left: 118px;
      width: 54px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(3) {
      top: 72px;
      left: 48px;
      width: 58px;
    }

    .overview-preview__part:nth-child(4) {
      top: 72px;
      left: 116px;
      width: 86px;
    }
  }

  .overview-preview--tag-item {
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(4) {
      display: none;
    }

    .overview-preview__part:nth-child(1) {
      left: 50%;
      width: 106px;
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3) {
      left: 50%;
      width: 84px;
      transform: translateX(-50%);
    }
  }

  .overview-preview--skeleton {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      left: 28px;
      display: block;
      height: 13px;
      background: linear-gradient(
        90deg,
        var(--overview-preview-soft),
        var(--overview-preview-muted),
        var(--overview-preview-soft)
      );
    }

    .overview-preview__part:nth-child(1) {
      top: 34px;
      width: 154px;
    }

    .overview-preview__part:nth-child(2) {
      top: 56px;
      width: 174px;
    }

    .overview-preview__part:nth-child(3) {
      top: 78px;
      width: 128px;
    }

    .overview-preview__part:nth-child(4) {
      top: 100px;
      width: 86px;
    }
  }

  .overview-preview--progress {
    .overview-preview__part:nth-child(1) {
      top: 60px;
      left: 26px;
      display: block;
      width: 168px;
      height: 12px;
      border-radius: var(--border-radius-999);
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 60px;
      left: 26px;
      display: block;
      width: 108px;
      height: 12px;
      border-radius: var(--border-radius-999);
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--table {
    .overview-preview__part:nth-child(n + 1):nth-child(-n + 12) {
      display: block;
      width: 42px;
      height: 13px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      top: 28px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(7),
    .overview-preview__part:nth-child(10) {
      left: 42px;
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(11) {
      left: 88px;
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(9),
    .overview-preview__part:nth-child(12) {
      left: 134px;
    }

    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6) {
      top: 48px;
    }

    .overview-preview__part:nth-child(7),
    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(9) {
      top: 68px;
    }

    .overview-preview__part:nth-child(10),
    .overview-preview__part:nth-child(11),
    .overview-preview__part:nth-child(12) {
      top: 88px;
    }

    .overview-preview__part:nth-child(8) {
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--qr-code {
    .overview-preview__part:nth-child(n + 1):nth-child(-n + 9) {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: var(--border-radius-20);
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(8) {
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(1) {
      top: 32px;
      left: 74px;
    }

    .overview-preview__part:nth-child(2) {
      top: 32px;
      left: 94px;
    }

    .overview-preview__part:nth-child(3) {
      top: 32px;
      left: 134px;
    }

    .overview-preview__part:nth-child(4) {
      top: 52px;
      left: 74px;
    }

    .overview-preview__part:nth-child(5) {
      top: 52px;
      left: 114px;
    }

    .overview-preview__part:nth-child(6) {
      top: 72px;
      left: 94px;
    }

    .overview-preview__part:nth-child(7) {
      top: 72px;
      left: 134px;
    }

    .overview-preview__part:nth-child(8) {
      top: 92px;
      left: 74px;
    }

    .overview-preview__part:nth-child(9) {
      top: 92px;
      left: 114px;
    }
  }

  .overview-preview--carousel {
    .overview-preview__part:nth-child(1) {
      top: 22px;
      left: 36px;
      display: block;
      width: 148px;
      height: 84px;
      background: var(--overview-preview-accent-soft);
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      top: 54px;
      display: block;
      width: 26px;
      height: 26px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(2) {
      left: 24px;
    }

    .overview-preview__part:nth-child(3) {
      right: 24px;
    }

    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6) {
      bottom: 16px;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: var(--border-radius-circular);
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(4) {
      left: 96px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(5) {
      left: 110px;
    }

    .overview-preview__part:nth-child(6) {
      left: 124px;
    }
  }

  .overview-preview--collapse {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      left: 40px;
      display: block;
      width: 140px;
      height: 26px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(1) {
      top: 28px;
    }

    .overview-preview__part:nth-child(2) {
      top: 62px;
    }

    .overview-preview__part:nth-child(3) {
      top: 96px;
    }

    .overview-preview__part:nth-child(4) {
      top: 70px;
      left: 56px;
      display: block;
      width: 74px;
      height: 8px;
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--divider {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(3) {
      left: 50%;
      display: block;
      width: 112px;
      height: 11px;
      background: var(--overview-preview-muted);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(1) {
      top: 38px;
    }

    .overview-preview__part:nth-child(2) {
      top: 64px;
      left: 50%;
      display: block;
      width: 148px;
      height: 2px;
      background: var(--nmorph-accent-color);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3) {
      top: 82px;
      width: 76px;
    }
  }

  .overview-preview--breadcrumb {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      top: 60px;
      display: block;
      height: 10px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(1) {
      left: 38px;
      width: 44px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(2) {
      left: 106px;
      width: 42px;
    }

    .overview-preview__part:nth-child(3) {
      left: 172px;
      width: 30px;
    }

    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5) {
      top: 58px;
      display: block;
      width: 10px;
      height: 10px;
      border-top: 2px solid var(--overview-preview-muted);
      border-right: 2px solid var(--overview-preview-muted);
      background: transparent;
      transform: rotate(45deg);
    }

    .overview-preview__part:nth-child(4) {
      left: 90px;
    }

    .overview-preview__part:nth-child(5) {
      left: 158px;
    }
  }

  .overview-preview--text-input,
  .overview-preview--textarea,
  .overview-preview--number-input,
  .overview-preview--select,
  .overview-preview--date-picker,
  .overview-preview--time-picker,
  .overview-preview--autocomplete {
    .overview-preview__part:nth-child(1) {
      top: 48px;
      left: 30px;
      display: block;
      width: 160px;
      height: 34px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 61px;
      left: 48px;
      display: block;
      width: 72px;
      height: 7px;
      background: var(--overview-preview-muted);
    }
  }

  .overview-preview--textarea {
    .overview-preview__part:nth-child(1) {
      top: 30px;
      height: 78px;
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      left: 48px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(2) {
      top: 48px;
      width: 104px;
    }

    .overview-preview__part:nth-child(3) {
      top: 66px;
      width: 128px;
    }

    .overview-preview__part:nth-child(4) {
      top: 84px;
      width: 72px;
    }
  }

  .overview-preview--number-input {
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      top: 52px;
      display: block;
      width: 26px;
      height: 26px;
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(3) {
      right: 58px;
    }

    .overview-preview__part:nth-child(4) {
      right: 30px;
      background: var(--overview-preview-accent-soft);
    }
  }

  .overview-preview--select,
  .overview-preview--date-picker,
  .overview-preview--time-picker {
    .overview-preview__part:nth-child(3) {
      top: 58px;
      right: 46px;
      display: block;
      width: 11px;
      height: 11px;
      border-right: 2px solid var(--nmorph-accent-color);
      border-bottom: 2px solid var(--nmorph-accent-color);
      background: transparent;
      transform: rotate(45deg);
    }
  }

  .overview-preview--date-picker {
    .overview-preview__part:nth-child(1) {
      top: 16px;
      left: 28px;
      width: 164px;
      height: 32px;
    }

    .overview-preview__part:nth-child(2) {
      top: 29px;
      left: 48px;
      width: 76px;
    }

    .overview-preview__part:nth-child(3) {
      top: 26px;
      right: 44px;
    }

    .overview-preview__part:nth-child(4) {
      top: 52px;
      left: 50%;
      display: block;
      width: 98px;
      height: 72px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(5) {
      top: 62px;
      left: 76px;
      display: block;
      width: 40px;
      height: 6px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(n + 6):nth-child(-n + 16) {
      display: block;
      width: 9px;
      height: 9px;
      border-radius: var(--border-radius-20);
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(7),
    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(9) {
      top: 78px;
    }

    .overview-preview__part:nth-child(10),
    .overview-preview__part:nth-child(11),
    .overview-preview__part:nth-child(12),
    .overview-preview__part:nth-child(13) {
      top: 94px;
    }

    .overview-preview__part:nth-child(14),
    .overview-preview__part:nth-child(15),
    .overview-preview__part:nth-child(16) {
      top: 110px;
    }

    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(10),
    .overview-preview__part:nth-child(14) {
      left: 78px;
    }

    .overview-preview__part:nth-child(7),
    .overview-preview__part:nth-child(11),
    .overview-preview__part:nth-child(15) {
      left: 96px;
    }

    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(12),
    .overview-preview__part:nth-child(16) {
      left: 114px;
    }

    .overview-preview__part:nth-child(9),
    .overview-preview__part:nth-child(13) {
      left: 132px;
    }

    .overview-preview__part:nth-child(11) {
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--time-picker {
    .overview-preview__part:nth-child(1) {
      top: 16px;
      left: 28px;
      width: 164px;
      height: 32px;
    }

    .overview-preview__part:nth-child(2) {
      top: 29px;
      left: 48px;
      width: 74px;
    }

    .overview-preview__part:nth-child(3) {
      top: 26px;
      right: 44px;
    }

    .overview-preview__part:nth-child(4) {
      top: 54px;
      left: 50%;
      display: block;
      width: 104px;
      height: 72px;
      border-radius: var(--border-radius-40);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(7) {
      left: 102px;
      display: block;
      width: 48px;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(5) {
      top: 72px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(6) {
      top: 94px;
    }

    .overview-preview__part:nth-child(7) {
      top: 112px;
      width: 36px;
    }

    .overview-preview__part:nth-child(8) {
      top: 64px;
      left: 72px;
      display: block;
      width: 26px;
      height: 26px;
      border-radius: var(--border-radius-circular);
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(9),
    .overview-preview__part:nth-child(10) {
      top: 77px;
      left: 85px;
      display: block;
      height: 2px;
      background: var(--nmorph-accent-color);
      transform-origin: left center;
    }

    .overview-preview__part:nth-child(9) {
      width: 10px;
    }

    .overview-preview__part:nth-child(10) {
      width: 8px;
      transform: rotate(-90deg);
    }
  }

  .overview-preview--autocomplete,
  .overview-preview--select {
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6) {
      left: 52px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(4) {
      top: 94px;
      width: 96px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(5) {
      top: 110px;
      width: 72px;
    }

    .overview-preview__part:nth-child(6) {
      top: 126px;
      width: 54px;
    }
  }

  .overview-preview--color-picker {
    .overview-preview__part:nth-child(1) {
      top: 34px;
      left: 54px;
      display: block;
      width: 108px;
      height: 34px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      top: 82px;
      display: block;
      width: 28px;
      height: 28px;
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(2) {
      left: 58px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(3) {
      left: 96px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(4) {
      left: 134px;
      background: var(--overview-preview-accent-soft);
    }
  }

  .overview-preview--switch {
    .overview-preview__part:nth-child(1) {
      top: 52px;
      left: 50%;
      display: block;
      width: 78px;
      height: 34px;
      border-radius: var(--border-radius-999);
      box-shadow: var(--nmorph-shadow-inset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 58px;
      left: calc(50% + 15px);
      display: block;
      width: 22px;
      height: 22px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-accent-color);
      box-shadow: var(--nmorph-shadow-outset);
    }
  }

  .overview-preview--checkbox,
  .overview-preview--checkbox-group,
  .overview-preview--radio,
  .overview-preview--radio-group {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(5) {
      left: 48px;
      display: block;
      width: 24px;
      height: 24px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(1) {
      top: 36px;
    }

    .overview-preview__part:nth-child(3) {
      top: 66px;
    }

    .overview-preview__part:nth-child(5) {
      top: 96px;
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(6) {
      left: 86px;
      display: block;
      width: 82px;
      height: 8px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(2) {
      top: 45px;
    }

    .overview-preview__part:nth-child(4) {
      top: 75px;
    }

    .overview-preview__part:nth-child(6) {
      top: 105px;
    }
  }

  .overview-preview--checkbox,
  .overview-preview--radio {
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6) {
      display: none;
    }

    .overview-preview__part:nth-child(1) {
      top: 56px;
    }

    .overview-preview__part:nth-child(2) {
      top: 65px;
    }
  }

  .overview-preview--radio,
  .overview-preview--radio-group {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(5) {
      border-radius: var(--border-radius-circular);
    }
  }

  .overview-preview--checkbox .overview-preview__part:nth-child(7),
  .overview-preview--checkbox-group .overview-preview__part:nth-child(7) {
    top: 61px;
    left: 54px;
    display: block;
    width: 14px;
    height: 8px;
    border-bottom: 3px solid var(--nmorph-accent-color);
    border-left: 3px solid var(--nmorph-accent-color);
    background: transparent;
    transform: rotate(-45deg);
  }

  .overview-preview--checkbox-group .overview-preview__part:nth-child(7) {
    top: 41px;
  }

  .overview-preview--radio .overview-preview__part:nth-child(7),
  .overview-preview--radio-group .overview-preview__part:nth-child(7) {
    top: 62px;
    left: 54px;
    display: block;
    width: 12px;
    height: 12px;
    border-radius: var(--border-radius-circular);
    background: var(--nmorph-accent-color);
  }

  .overview-preview--radio-group .overview-preview__part:nth-child(7) {
    top: 42px;
  }

  .overview-preview--select-button {
    .overview-preview__part:nth-child(1) {
      top: 48px;
      left: 42px;
      display: block;
      width: 136px;
      height: 36px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 52px;
      left: 108px;
      display: block;
      width: 66px;
      height: 28px;
      background: var(--overview-preview-accent-soft);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      top: 62px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3) {
      left: 58px;
      width: 30px;
    }

    .overview-preview__part:nth-child(4) {
      left: 130px;
      width: 28px;
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--file-upload {
    .overview-preview__part:nth-child(1) {
      top: 28px;
      left: 50%;
      display: block;
      width: 124px;
      height: 80px;
      border: 1px dashed color-mix(in srgb, var(--nmorph-text-color) 22%, transparent);
      background: var(--overview-preview-faint);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 50px;
      left: 50%;
      display: block;
      width: 28px;
      height: 28px;
      background: var(--nmorph-accent-color);
      clip-path: polygon(50% 0, 86% 36%, 66% 36%, 66% 100%, 34% 100%, 34% 36%, 14% 36%);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3) {
      top: 90px;
      left: 50%;
      display: block;
      width: 64px;
      height: 8px;
      background: var(--overview-preview-muted);
      transform: translateX(-50%);
    }
  }

  .overview-preview--slider {
    .overview-preview__part:nth-child(1) {
      top: 62px;
      left: 34px;
      display: block;
      width: 154px;
      height: 8px;
      border-radius: var(--border-radius-999);
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 62px;
      left: 34px;
      display: block;
      width: 88px;
      height: 8px;
      border-radius: var(--border-radius-999);
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(3) {
      top: 52px;
      left: 114px;
      display: block;
      width: 28px;
      height: 28px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }
  }

  .overview-preview--otp-input {
    .overview-preview__part:nth-child(n + 1):nth-child(-n + 6) {
      top: 52px;
      display: block;
      width: 26px;
      height: 34px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(1) {
      left: 30px;
    }

    .overview-preview__part:nth-child(2) {
      left: 60px;
    }

    .overview-preview__part:nth-child(3) {
      left: 90px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(4) {
      left: 120px;
    }

    .overview-preview__part:nth-child(5) {
      left: 150px;
    }

    .overview-preview__part:nth-child(6) {
      left: 180px;
    }
  }

  .overview-preview--calendar {
    .overview-preview__part:nth-child(1) {
      top: 22px;
      left: 42px;
      display: block;
      width: 136px;
      height: 98px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 34px;
      left: 58px;
      display: block;
      width: 60px;
      height: 9px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(n + 3):nth-child(-n + 16) {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: var(--border-radius-20);
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(7) {
      top: 56px;
    }

    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(9),
    .overview-preview__part:nth-child(10),
    .overview-preview__part:nth-child(11),
    .overview-preview__part:nth-child(12) {
      top: 76px;
    }

    .overview-preview__part:nth-child(13),
    .overview-preview__part:nth-child(14),
    .overview-preview__part:nth-child(15),
    .overview-preview__part:nth-child(16) {
      top: 96px;
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(13) {
      left: 58px;
    }

    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(9),
    .overview-preview__part:nth-child(14) {
      left: 78px;
    }

    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(10),
    .overview-preview__part:nth-child(15) {
      left: 98px;
    }

    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(11),
    .overview-preview__part:nth-child(16) {
      left: 118px;
    }

    .overview-preview__part:nth-child(7),
    .overview-preview__part:nth-child(12) {
      left: 138px;
    }

    .overview-preview__part:nth-child(10) {
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--tabs {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      top: 30px;
      display: block;
      width: 46px;
      height: 24px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(1) {
      left: 40px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(2) {
      left: 90px;
    }

    .overview-preview__part:nth-child(3) {
      left: 140px;
    }

    .overview-preview__part:nth-child(4) {
      top: 66px;
      left: 40px;
      display: block;
      width: 148px;
      height: 52px;
      box-shadow: var(--nmorph-shadow-inset);
    }
  }

  .overview-preview--pagination {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      left: 42px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(1) {
      top: 30px;
      width: 132px;
    }

    .overview-preview__part:nth-child(2) {
      top: 50px;
      width: 164px;
    }

    .overview-preview__part:nth-child(3) {
      top: 70px;
      width: 96px;
    }

    .overview-preview__part:nth-child(n + 4):nth-child(-n + 9) {
      top: 96px;
      display: block;
      width: 24px;
      height: 24px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(4) {
      left: 28px;
    }

    .overview-preview__part:nth-child(5) {
      left: 60px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(6) {
      left: 92px;
    }

    .overview-preview__part:nth-child(7) {
      left: 124px;
    }

    .overview-preview__part:nth-child(8) {
      left: 156px;
    }

    .overview-preview__part:nth-child(9) {
      left: 188px;
    }

    .overview-preview__part:nth-child(n + 10) {
      display: none;
    }
  }

  .overview-preview--stepper {
    .overview-preview__part:nth-child(1) {
      top: 66px;
      left: 44px;
      display: block;
      width: 128px;
      height: 4px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      top: 54px;
      display: block;
      width: 28px;
      height: 28px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(2) {
      left: 36px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(3) {
      left: 94px;
    }

    .overview-preview__part:nth-child(4) {
      left: 152px;
    }
  }

  .overview-preview--dropdown,
  .overview-preview--context-menu {
    .overview-preview__part:nth-child(1) {
      top: 28px;
      left: 42px;
      display: block;
      width: 136px;
      height: 32px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 40px;
      left: 58px;
      display: block;
      width: 58px;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3) {
      top: 36px;
      right: 58px;
      display: block;
      width: 11px;
      height: 11px;
      border-right: 2px solid var(--nmorph-accent-color);
      border-bottom: 2px solid var(--nmorph-accent-color);
      background: transparent;
      transform: rotate(45deg);
    }

    .overview-preview__part:nth-child(4) {
      top: 72px;
      left: 54px;
      display: block;
      width: 112px;
      height: 70px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(7) {
      left: 72px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(5) {
      top: 88px;
      width: 74px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(6) {
      top: 106px;
      width: 56px;
    }

    .overview-preview__part:nth-child(7) {
      top: 124px;
      width: 42px;
    }
  }

  .overview-preview--context-menu {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      display: none;
    }

    .overview-preview__part:nth-child(4) {
      top: 36px;
      left: 78px;
      width: 112px;
      height: 86px;
    }

    .overview-preview__part:nth-child(8) {
      top: 24px;
      left: 42px;
      display: block;
      width: 28px;
      height: 32px;
      border: 0;
      border-radius: 0;
      background: var(--nmorph-accent-color);
      clip-path: polygon(8% 0, 92% 58%, 58% 66%, 76% 100%, 54% 100%, 36% 72%, 8% 90%);
    }

    .overview-preview__part:nth-child(9) {
      display: none;
    }
  }

  .overview-preview--backtop {
    .overview-preview__part:nth-child(1) {
      inset: 18px 32px;
      display: block;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5) {
      left: 50px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(2) {
      top: 36px;
      width: 86px;
    }

    .overview-preview__part:nth-child(3) {
      top: 54px;
      width: 112px;
    }

    .overview-preview__part:nth-child(4) {
      top: 72px;
      width: 76px;
    }

    .overview-preview__part:nth-child(5) {
      top: 90px;
      width: 104px;
    }

    .overview-preview__part:nth-child(6) {
      right: 42px;
      bottom: 20px;
      display: block;
      width: 42px;
      height: 34px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(7) {
      right: 57px;
      bottom: 29px;
      display: block;
      width: 12px;
      height: 12px;
      border-top: 2px solid var(--nmorph-accent-color);
      border-left: 2px solid var(--nmorph-accent-color);
      background: transparent;
      transform: rotate(45deg);
    }
  }

  .overview-preview--alert,
  .overview-preview--callout {
    .overview-preview__part:nth-child(1) {
      top: 38px;
      left: 36px;
      display: block;
      width: 148px;
      height: 62px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(2) {
      top: 52px;
      left: 52px;
      display: block;
      width: 22px;
      height: 22px;
      border-radius: var(--border-radius-circular);
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      left: 86px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3) {
      top: 52px;
      width: 76px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(4) {
      top: 72px;
      width: 92px;
    }
  }

  .overview-preview--callout {
    .overview-preview__part:nth-child(2) {
      top: 38px;
      left: 36px;
      width: 6px;
      height: 62px;
      border-radius: var(--border-radius-40) 0 0 var(--border-radius-40);
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--tooltip {
    .overview-preview__part:nth-child(1) {
      top: 68px;
      left: 50%;
      display: block;
      width: 42px;
      height: 42px;
      border-radius: var(--border-radius-circular);
      background: var(--overview-preview-soft);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 28px;
      left: 50%;
      display: block;
      width: 96px;
      height: 32px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(3) {
      top: 56px;
      left: 50%;
      display: block;
      width: 14px;
      height: 14px;
      background: var(--nmorph-main-color);
      transform: translateX(-50%) rotate(45deg);
    }

    .overview-preview__part:nth-child(4) {
      top: 42px;
      left: 50%;
      display: block;
      width: 46px;
      height: 6px;
      background: var(--nmorph-accent-color);
      transform: translateX(-50%);
    }
  }

  .overview-preview--overlay {
    .overview-preview__part:nth-child(1) {
      inset: 16px 28px;
      display: block;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      inset: 26px 40px;
      display: block;
      background: color-mix(in srgb, var(--nmorph-text-color) 13%, transparent);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--nmorph-text-color) 10%, transparent);
    }

    .overview-preview__part:nth-child(3) {
      top: 50px;
      right: 50px;
      display: block;
      width: 82px;
      height: 48px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }
  }

  .overview-preview--dialog {
    .overview-preview__part:nth-child(1) {
      top: 26px;
      left: 50%;
      display: block;
      width: 146px;
      height: 98px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      left: 72px;
      display: block;
      height: 8px;
    }

    .overview-preview__part:nth-child(2) {
      top: 44px;
      width: 54px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(3) {
      top: 68px;
      width: 100px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(4) {
      top: 86px;
      width: 72px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(5) {
      top: 98px;
      right: 64px;
      display: block;
      width: 44px;
      height: 18px;
      box-shadow: var(--nmorph-shadow-inset);
    }
  }

  .overview-preview--drawer {
    .overview-preview__part:nth-child(1) {
      inset: 18px 34px;
      display: block;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 18px;
      right: 34px;
      bottom: 18px;
      display: block;
      width: 74px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4) {
      right: 50px;
      display: block;
      height: 7px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3) {
      top: 42px;
      width: 42px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(4) {
      top: 64px;
      width: 52px;
    }
  }

  .overview-preview--notification {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(3) {
      display: block;
      width: 148px;
      height: 34px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(1) {
      top: 20px;
      right: 28px;
    }

    .overview-preview__part:nth-child(2) {
      top: 54px;
      right: 42px;
      opacity: 0.78;
    }

    .overview-preview__part:nth-child(3) {
      top: 88px;
      right: 56px;
      opacity: 0.55;
    }

    .overview-preview__part:nth-child(4) {
      top: 32px;
      left: 54px;
      display: block;
      width: 58px;
      height: 6px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(5) {
      top: 44px;
      left: 54px;
      display: block;
      width: 96px;
      height: 5px;
      background: var(--overview-preview-muted);
    }
  }

  .overview-preview--form {
    .overview-preview__part:nth-child(1),
    .overview-preview__part:nth-child(3) {
      left: 36px;
      display: block;
      width: 48px;
      height: 8px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(1) {
      top: 36px;
    }

    .overview-preview__part:nth-child(3) {
      top: 76px;
      width: 34px;
    }

    .overview-preview__part:nth-child(2),
    .overview-preview__part:nth-child(4) {
      left: 96px;
      display: block;
      width: 108px;
      height: 28px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 26px;
    }

    .overview-preview__part:nth-child(4) {
      top: 66px;
    }

    .overview-preview__part:nth-child(5) {
      top: 102px;
      right: 20px;
      display: block;
      width: 64px;
      height: 24px;
      background: var(--overview-preview-accent-soft);
      box-shadow: var(--nmorph-shadow-outset);
    }
  }

  .overview-preview--emoji-picker {
    .overview-preview__part:nth-child(1) {
      top: 18px;
      left: 50%;
      display: block;
      width: 142px;
      height: 108px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
      transform: translateX(-50%);
    }

    .overview-preview__part:nth-child(2) {
      top: 32px;
      left: 54px;
      display: block;
      width: 68px;
      height: 8px;
      background: var(--nmorph-accent-color);
    }

    .overview-preview__part:nth-child(n + 3):nth-child(-n + 14) {
      display: block;
      width: 14px;
      height: 14px;
      border-radius: var(--border-radius-circular);
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(6) {
      top: 54px;
    }

    .overview-preview__part:nth-child(7),
    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(9),
    .overview-preview__part:nth-child(10) {
      top: 76px;
    }

    .overview-preview__part:nth-child(11),
    .overview-preview__part:nth-child(12),
    .overview-preview__part:nth-child(13),
    .overview-preview__part:nth-child(14) {
      top: 98px;
    }

    .overview-preview__part:nth-child(3),
    .overview-preview__part:nth-child(7),
    .overview-preview__part:nth-child(11) {
      left: 58px;
    }

    .overview-preview__part:nth-child(4),
    .overview-preview__part:nth-child(8),
    .overview-preview__part:nth-child(12) {
      left: 82px;
      background: var(--overview-preview-accent-soft);
    }

    .overview-preview__part:nth-child(5),
    .overview-preview__part:nth-child(9),
    .overview-preview__part:nth-child(13) {
      left: 106px;
    }

    .overview-preview__part:nth-child(6),
    .overview-preview__part:nth-child(10),
    .overview-preview__part:nth-child(14) {
      left: 130px;
    }
  }

  .overview-preview--guide,
  .overview-preview--guide-step {
    .overview-preview__part:nth-child(1) {
      top: 24px;
      left: 34px;
      display: block;
      width: 132px;
      height: 82px;
      box-shadow: var(--nmorph-shadow-inset);
    }

    .overview-preview__part:nth-child(2) {
      top: 42px;
      left: 54px;
      display: block;
      width: 48px;
      height: 8px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(3) {
      top: 66px;
      left: 54px;
      display: block;
      width: 74px;
      height: 8px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(4) {
      top: 86px;
      left: 54px;
      display: block;
      width: 56px;
      height: 8px;
      background: var(--overview-preview-muted);
    }

    .overview-preview__part:nth-child(5) {
      top: 52px;
      right: 28px;
      display: block;
      width: 82px;
      height: 48px;
      background: var(--nmorph-main-color);
      box-shadow: var(--nmorph-shadow-outset);
    }

    .overview-preview__part:nth-child(6) {
      top: 66px;
      right: 54px;
      display: block;
      width: 34px;
      height: 7px;
      background: var(--nmorph-accent-color);
    }
  }

  .overview-preview--guide-step {
    .overview-preview__part:nth-child(7) {
      top: 32px;
      right: 70px;
      display: block;
      width: 28px;
      height: 28px;
      border-radius: var(--border-radius-circular);
      background: var(--nmorph-accent-color);
      box-shadow: var(--nmorph-shadow-outset);
    }
  }

  @include max-width-query(1600) {
    .overview-component-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @include max-width-query(1366) {
    .overview-component-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include max-width-query(768) {
    .overview-component-wrapper {
      width: 100%;
    }
  }

  @include max-width-query(550) {
    .overview-component-list {
      grid-template-columns: 1fr;
    }

    .nmorph-card__content {
      padding-right: 12px;
      padding-left: 12px;
    }
  }
}
</style>
