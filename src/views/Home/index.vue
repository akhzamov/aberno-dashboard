<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Home",
});
</script>

<template>
  <section class="home section">
    <h1 class="home__title title-black-gl">Дашборд</h1>
    <div class="home__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
А
