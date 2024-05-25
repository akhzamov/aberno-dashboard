<script lang="ts" setup>
import { defineComponent, h } from "vue";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import {
  BookmarkSquareIcon,
  CalendarIcon,
  QueueListIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/solid";

const links = [
  {
    name: "Перекличка",
    href: "/roll-call",
    description: "Страница перекличек пользователей",
    icon: CalendarIcon,
  },
  {
    name: "Пользователи",
    href: "/users",
    description: "Страница управление пользователями",
    icon: UserPlusIcon,
  },
];
</script>
<template>
  <div class="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
    <h1
      class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
    >
      Эта страница в режиме разрабоики
    </h1>
    <p
      class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8"
    >
      Вы можете посетить другие страницы
    </p>
  </div>
  <div class="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
    <h2 class="sr-only">Popular pages</h2>
    <ul
      role="list"
      class="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
    >
      <li
        v-for="(link, linkIdx) in links"
        :key="linkIdx"
        class="relative flex gap-x-6 py-6"
      >
        <div
          class="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10"
        >
          <component :is="link.icon" class="h-6 w-6" aria-hidden="true" />
        </div>
        <div class="flex-auto">
          <h3 class="text-sm font-semibold leading-6 text-gray-900">
            <RouterLink :to="link.href">
              <span class="absolute inset-0" aria-hidden="true" />
              {{ link.name }}
            </RouterLink>
          </h3>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            {{ link.description }}
          </p>
        </div>
        <div class="flex-none self-center">
          <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss"></style>
