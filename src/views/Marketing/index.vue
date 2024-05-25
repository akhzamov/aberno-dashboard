<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Marketing",
});
</script>

<template>
  <section class="marketing section">
    <h1 class="marketing__title title-black-gl">Маркетинг</h1>
    <div class="marketing__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
