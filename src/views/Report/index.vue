<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Report",
});
</script>

<template>
  <section class="report section">
    <h1 class="report__title title-black-gl">Отчет</h1>
    <div class="report__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
