<script setup lang="ts">
const utilsClasses = `
.nmorph--shadow-outset: {
  background: var(--nmorph-main-color);
  box-shadow:
    var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
}

.nmorph--shadow-inset: {
  background: var(--nmorph-main-color);
  box-shadow:
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
}

.nmorph-body-4 {
  font-weight: 400;
  font-size: var(--font-size-tiny);
  line-height: var(--line-height-regular);,
}

.nmorph-body-3: {
  font-weight: 400;
  font-size: var(--font-size-extra-small);
  line-height: var(--line-height-regular);
}

.nmorph-body-2: {
  font-weight: 400;
  font-size: var(--font-size-small);
  line-height: var(--line-height-regular);
}

.nmorph-body-1: {
  font-weight: 400;
  font-size: var(--font-size-base);
  line-height: var(--line-height-regular);
}

.nmorph-title-4: {
  font-weight: 600;
  font-size: var(--font-size-small);
  line-height: var(--line-height-loose);
}

.nmorph-title-3: {
  font-weight: 600;
  font-size: var(--font-size-medium);
  line-height: var(--line-height-loose);
}

.nmorph-title-2: {
  font-weight: 600;
  font-size: var(--font-size-large);
  line-height: var(--line-height-loose);
}

.nmorph-title-1: {
  font-weight: 800;
  font-size: var(--font-size-extra-large);
  line-height: var(--line-height-loose);
}
`;
</script>

<template>
  <section>
    <h2 class="section-title">{{ $t("guide-menu.other") }}</h2>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.other.utils-classes") }}
      </h3>
      <code-example lang="javascript">{{
        utilsClasses
      }}</code-example>
    </div>
  </section>
</template>
