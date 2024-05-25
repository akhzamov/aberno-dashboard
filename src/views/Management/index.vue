<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Management",
});
</script>

<template>
  <section class="management section">
    <h1 class="management__title title-black-gl">Менеджмент</h1>
    <div class="management__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
