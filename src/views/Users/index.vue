<script lang="ts" setup>
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { useGlobalStore } from "@/stores/global";
import { useAuthStore } from "@/stores/auth";
import { getDepartments, getPositions, getRoles } from "./users.data";
import AllModers from "@/components/Users/AllModers/AllModers.vue";
import AllUsers from "@/components/Users/AllUsers/AllUsers.vue";

const globalStore = useGlobalStore();
const authStore = useAuthStore();

let activeTab = computed(() => globalStore.activeTab);
let isSuperAdmin = computed(() => authStore.isSuperAdmin);

onMounted(() => {
  getDepartments();
  getPositions();
  getRoles();
});

defineComponent({
  name: "Users",
});
</script>

<template>
  <section class="users section">
    <h1 class="users__title title-black-gl">Все пользователи</h1>
    <div class="users__content section__content">
      <div class="section__content-tabs">
        <ul class="section__content-tabs-list">
          <li
            class="section__content-tabs-list-item"
            :class="{ active: globalStore.activeTab == 1 }"
            @click="globalStore.activeTab = 1"
          >
            Все пользователи <span></span>
          </li>
          <li
            class="section__content-tabs-list-item"
            :class="{ active: globalStore.activeTab == 2 }"
            @click="globalStore.activeTab = 2"
            v-if="isSuperAdmin"
          >
            Все модераторы <span></span>
          </li>
        </ul>
      </div>
      <div class="section__content-views">
        <AllUsers v-if="activeTab == 1" />
        <AllModers v-if="activeTab == 2 && isSuperAdmin" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
