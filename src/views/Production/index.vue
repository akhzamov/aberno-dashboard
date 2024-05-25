<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Production",
});
</script>

<template>
  <section class="production section">
    <h1 class="production__title title-black-gl">Производство</h1>
    <div class="production__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
