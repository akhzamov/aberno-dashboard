<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "HR",
});
</script>

<template>
  <section class="hr section">
    <h1 class="hr__title title-black-gl">HR</h1>
    <div class="hr__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
