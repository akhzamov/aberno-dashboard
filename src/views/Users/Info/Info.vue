<script lang="ts" setup>
import { ref } from "vue";
import Info from "@/components/Users/Info/Info.vue";
import Detail from "@/components/Users/Detail/Detail.vue";

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
</script>

<template>
  <section class="user-info section">
    <h1 class="user-info__title title-black-gl">Информация о пользователе</h1>
    <div class="user-info__contents section__contents">
      <div class="user-info__content section__content">
        <div class="section__content-views">
          <Info />
        </div>
      </div>
      <div class="user-info__content section__content detail">
        <Detail />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
