<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphCollapse v-model="selectedCollapseEl">
        <NmorphCollapseItem name="1" >
          <template #title>Title one</template>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quae rem harum officiis iure id explicabo, placeat ab accusantium atque adipisci eaque eius error libero laboriosam tenetur ipsum, obcaecati voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid delectus illo, velit nobis sit quidem consectetur dolor ullam expedita. Est corporis fugit recusandae ad hic molestias id nulla beatae.
        </NmorphCollapseItem>
        <NmorphCollapseItem name="2" title="Title two">
          Lorem ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid delectus illo, velit nobis sit quidem consectetur dolor ullam expedita. Est corporis fugit recusandae ad hic molestias id nulla beatae.
        </NmorphCollapseItem>
        <NmorphCollapseItem name="3" title="Title three and disabled" disabled>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quae rem harum officiis iure id explicabo, placeat ab accusantium atque adipisci eaque eius error libero laboriosam tenetur ipsum, obcaecati voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid delectus illo, velit nobis sit quidem consectetur dolor ullam expedita. Est corporis fugit recusandae ad hic molestias id nulla beatae.
        </NmorphCollapseItem>
        <NmorphCollapseItem name="4" title="Title four">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quae rem harum officiis iure id explicabo, placeat ab accusantium atque adipisci eaque eius error libero laboriosam tenetur ipsum, obcaecati voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid delectus illo, velit nobis sit quidem consectetur dolor ullam expedita. Est corporis fugit recusandae ad hic molestias id nulla beatae.
        </NmorphCollapseItem>
      </NmorphCollapse>
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NmorphCard, NmorphCollapseItem, NmorphCollapse } from './../../../library/src/components';
const selectedCollapseEl = ref(['1', '4'])
</script>

<style lang="scss">
.wrapper {
  background-color: var(--main-bg);
  height: 100vh;
  padding: 0;
}
</style>
