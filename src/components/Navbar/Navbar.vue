<script lang="ts" setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const user = computed(() => authStore.user.user);
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="nav__logo">
      <img src="@/assets/img/Aberno-logo-blue-horizontal.svg" alt="" />
    </RouterLink>
    <div class="nav__user">
      <div class="nav__user-left">
        <img src="@/assets/img/user-avatar.svg" alt="" />
      </div>
      <div class="nav__user-right">
        <h3 class="nav__user-name">{{ user?.name }} {{ user?.last_name }}</h3>
        <p class="nav__user-login">
          Табельный номер: {{ user?.employee_number }}
        </p>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
