<script lang="ts" setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
    <nav class="nav">
        <RouterLink to="/" class="nav__logo">
            <img src="@/assets/img/Aberno-logo-blue-horizontal.svg" alt="">
        </RouterLink>
        <div class="nav__user">
            <div class="nav__user-left">
                <img src="@/assets/img/user-avatar.svg" alt="">
            </div>
            <div class="nav__user-right">
                <h3 class="nav__user-name">{{ user.last_name || 'Павел Дуров' }}</h3>
                <p class="nav__user-login">Логин: {{ user.username }}</p>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>