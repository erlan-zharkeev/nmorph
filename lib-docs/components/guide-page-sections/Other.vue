<script setup lang="ts">
const utilsClasses = [
  { name: '.nmorph--shadow-outset', description: 'Raised neumorphic surface shadow' },
  { name: '.nmorph--shadow-inset', description: 'Pressed neumorphic surface shadow' },
  { name: '.nmorph--shadow-combined', description: 'Combined outer and inner neumorphic shadow' },
  { name: '.nmorph-body-4', description: 'Tiny body typography' },
  { name: '.nmorph-body-3', description: 'Extra small body typography' },
  { name: '.nmorph-body-2', description: 'Small body typography' },
  { name: '.nmorph-body-1', description: 'Base body typography' },
  { name: '.nmorph-title-4', description: 'Small title typography' },
  { name: '.nmorph-title-3', description: 'Medium title typography' },
  { name: '.nmorph-title-2', description: 'Large title typography' },
  { name: '.nmorph-title-1', description: 'Extra large title typography' },
  { name: '.nmorph--default-height-component', description: 'Default component height' },
  { name: '.nmorph--thin-component', description: 'Thin component height' },
  { name: '.nmorph--thick-component', description: 'Thick component height' },
  { name: '.nmorph--fill', description: 'Full container width' },
  { name: '.nmorph--focused', description: 'Focus color for nested icons' },
  { name: '.nmorph-native-input', description: 'Native input color behavior for focus and placeholders' },
  { name: '.list-enter-active, .list-leave-active', description: 'Active state for horizontal list transitions' },
  { name: '.list-enter-from, .list-leave-to', description: 'Initial and leaving state for horizontal list transitions' },
  { name: '.opacity-enter-active, .opacity-list-leave-active', description: 'Active state for opacity transitions' },
  { name: '.opacity-enter-from, .opacity-leave-to', description: 'Initial and leaving state for opacity transitions' },
];
</script>

<template>
  <section>
    <h2 class="section-title">{{ $t("guide-menu.other") }}</h2>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.other.utils-classes") }}
      </h3>
      <dl class="docs-utility-list">
        <div v-for="utilityClass in utilsClasses" :key="utilityClass.name" class="docs-utility-list__row">
          <dt><code>{{ utilityClass.name }}</code></dt>
          <dd>{{ utilityClass.description }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style lang="scss">
.docs-utility-list {
  display: grid;
  gap: 6px;
  margin: 0;
}

.docs-utility-list__row {
  display: grid;
  grid-template-columns: minmax(0, 42%) minmax(0, 1fr);
  gap: 12px;
}

.docs-utility-list dt,
.docs-utility-list dd {
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
}

.docs-utility-list code {
  white-space: normal;
  word-break: break-word;
}

@include max-width-query(768) {
  .docs-utility-list__row {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>
