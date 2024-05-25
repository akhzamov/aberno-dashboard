<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Finance",
});
</script>

<template>
  <section class="finance section">
    <h1 class="finance__title title-black-gl">Финансы</h1>
    <div class="finance__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
