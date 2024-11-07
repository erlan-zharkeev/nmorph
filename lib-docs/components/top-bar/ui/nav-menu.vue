<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <nav>
    <ul class="nav-menu-list">
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
</template>
