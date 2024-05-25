<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const logout = () => {
  sessionStorage.removeItem("access_token");
  router.push("/authorization");
};

import {
  ChartBarIcon,
  CalendarIcon,
  UserPlusIcon,
  FlagIcon,
  UsersIcon,
  BanknotesIcon,
  GlobeAsiaAustraliaIcon,
  SparklesIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  RectangleGroupIcon,
  Cog8ToothIcon,
  PowerIcon,
} from "@heroicons/vue/24/outline";

const links = [
  {
    name: "Дашборд",
    href: "/home",
    icon: ChartBarIcon,
  },
  {
    name: "Пользователи",
    href: "/users",
    icon: UserPlusIcon,
  },
  {
    name: "Перекличка",
    href: "/roll-call",
    icon: CalendarIcon,
  },
  {
    name: "Отчет",
    href: "/report",
    icon: FlagIcon,
  },
  {
    name: "HR",
    href: "/hr",
    icon: UsersIcon,
  },
  {
    name: "Финансы",
    href: "/finance",
    icon: BanknotesIcon,
  },
  {
    name: "Маркетинг",
    href: "/marketing",
    icon: GlobeAsiaAustraliaIcon,
  },
  {
    name: "Продажи",
    href: "/sales",
    icon: SparklesIcon,
  },
  {
    name: "Склад",
    href: "/stock",
    icon: ServerStackIcon,
  },
  {
    name: "Менеджмент",
    href: "/management",
    icon: ShieldCheckIcon,
  },
  {
    name: "Производство",
    href: "/production",
    icon: RectangleGroupIcon,
  },
];
</script>

<template>
  <aside class="aside">
    <ul class="aside__list">
      <li class="aside__list-item" v-for="item in links" :key="item.href">
        <RouterLink :to="item.href" class="aside__list-link">
          <div class="aside__list-link-line"></div>
          <div class="aside__list-link-content">
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
            <span class="span">{{ item.name }}</span>
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
            <component :is="Cog8ToothIcon" class="h-6 w-6" aria-hidden="true" />
            <span class="span">Настройки</span>
          </div>
        </RouterLink>
      </li>
      <li class="aside__list-item">
        <button class="aside__list-link" @click="logout">
          <div class="aside__list-link-line danger"></div>
          <div class="aside__list-link-content danger">
            <component :is="PowerIcon" class="h-6 w-6" aria-hidden="true" />
            <span class="span">Выход</span>
          </div>
        </button>
      </li>
    </ul>
  </aside>
</template>

<style scoped></style>
