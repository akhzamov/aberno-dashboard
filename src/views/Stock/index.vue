<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Stock",
});
</script>

<template>
  <section class="stock section">
    <h1 class="stock__title title-black-gl">Склад</h1>
    <div class="stock__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
