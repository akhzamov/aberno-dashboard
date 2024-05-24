<script lang="ts" setup>
import { defineComponent } from "vue";
import RollCall from "@/components/RollCall/RollCall.vue";

defineComponent({
  name: "Roll-Call",
});
</script>

<template>
  <section class="roll-call section">
    <h1 class="roll-call__title title-black-gl">Перекличка</h1>
    <div class="roll-call__content section__content">
      <div class="section__content-tabs">
        <ul class="section__content-tabs-list">
          <li class="section__content-tabs-list-item active">
            Перекличка <span></span>
          </li>
        </ul>
      </div>
      <div class="section__content-views">
        <RollCall />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
