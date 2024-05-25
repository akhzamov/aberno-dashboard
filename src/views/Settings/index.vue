<script lang="ts" setup>
import { defineComponent } from "vue";
import Development from "@/components/Development/Development.vue";

defineComponent({
  name: "Settings",
});
</script>

<template>
  <section class="settings section">
    <h1 class="settings__title title-black-gl">Настройки</h1>
    <div class="settings__content section__content">
      <Development />
    </div>
  </section>
</template>

<style scoped></style>
