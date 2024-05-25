<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Sales",
});
</script>

<template>
  <section class="sales section">
    <h1 class="sales__title title-black-gl">Продажи</h1>
    <div class="sales__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
