<script setup lang="ts">
interface IProps {
  type?: keyof typeof DocsInfo;
  title: string;
  content: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: "info",
});

enum DocsInfo {
  warning = "warning",
  info = "info",
}
</script>

<template>
  <div class="docs-info" :class="`docs-info--${props.type}`">
    <div class="docs-info__title nmorph-title-3">{{ props.title }}</div>
    <div class="docs-info__content nmorph-body-3">
      {{ props.content }}
    </div>
  </div>
</template>

<style lang="scss">
.docs-info {
  position: relative;
  padding: 8px 12px;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 4px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--nmorph-accent-color);
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: var(--nmorph-accent-color);
    width: 100%;
    height: 100%;
    opacity: 0.2;
  }
}

.docs-info--warning {
  background: rgba(var(--nmorph-warn-color), 0.5);

  &:before {
    background: var(--nmorph-warn-color);
  }
}

.docs-info__title {
  margin-bottom: 8px;
}

.docs-info__title,
.docs-info__content {
  color: var(--nmorph-white-color);
}
</style>
