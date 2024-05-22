<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const logout = () => {
    sessionStorage.removeItem('access_token')
    router.push('/authorization')
}
</script>

<template>
    <aside class="aside">
        <ul class="aside__list">
            <li class="aside__list-item">
                <RouterLink to="/roll-call" class="aside__list-link">
                    <div class="aside__list-link-line"></div>
                    <div class="aside__list-link-content">
                        <ico_calendar color="#FFF" size="28" />
                        <span class="span">Перекличка</span>
                    </div>
                </RouterLink>
            </li>
            <li class="aside__list-item">
                <RouterLink to="/users" class="aside__list-link">
                    <div class="aside__list-link-line"></div>
                    <div class="aside__list-link-content">
                        <ico_user_add color="#FFF" size="28" />
                        <span class="span">Пользователи</span>
                    </div>
                </RouterLink>
            </li>
            <li class="aside__list-item">
                <RouterLink to="/report" class="aside__list-link">
                    <div class="aside__list-link-line"></div>
                    <div class="aside__list-link-content">
                        <ico_report color="#FFF" size="28" />
                        <span class="span">Отчет</span>
                    </div>
                </RouterLink>
            </li>
        </ul>
        <div class="aside__line"></div>
        <ul class="aside__list">
            <li class="aside__list-item">
                <RouterLink to="/settings" class="aside__list-link">
                    <div class="aside__list-link-line"></div>
                    <div class="aside__list-link-content">
                        <ico_setting color="#FFF" size="28" />
                        <span class="span">Настройки</span>
                    </div>
                </RouterLink>
            </li>
            <li class="aside__list-item">
                <button class="aside__list-link" @click="logout">
                    <div class="aside__list-link-line danger"></div>
                    <div class="aside__list-link-content danger">
                        <ico_on_off color="#FFF" size="28" />
                        <span class="span">Выход</span>
                    </div>
                </button>
            </li>
        </ul>
    </aside>
</template>

<style scoped></style>