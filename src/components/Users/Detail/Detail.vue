<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import {
  getEmployeeByID,
  deactivateEmployeeByID,
  reactivateEmployeeByID,
} from "./detail.data";
import type { IEmployee } from "@/Interfaces/user.interface";

interface IUserData {
  title: string;
  admin: boolean;
  id: number;
}

const defaultUserData: IUserData = {
  title: "Информация о пользователе",
  admin: false,
  id: 1,
};
const userData = computed<IUserData>(() => {
  return window.history.state?.userData || defaultUserData;
});
const user = ref<Partial<IEmployee>>({});

onMounted(async () => {
  try {
    const res = await getEmployeeByID(userData.value.id);
    user.value = res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="user-info__detail flex flex-col">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-main-text-color">Информация</h2>
      <router-link
        :to="{
          name: 'UsersEdit',
          params: {
            id: user.id,
          },
          state: {
            userData: {
              title: userData.admin
                ? 'Изменить модератора'
                : 'Изменить пользователя',
              admin: userData.admin ? true : false,
              id: user.id,
            },
          },
        }"
        class="user-info__detail-edit-btn"
        >Редактировать</router-link
      >
    </div>
    <ul class="space-y-3 mb-6">
      <li>
        <strong>Ф.И.О:</strong>
        {{ `${user.user?.name} ${user.user?.last_name}` }}
      </li>
      <li><strong>ID пользователя:</strong> {{ user.id }}</li>
      <li>
        <strong>Должность, отдел:</strong>
        {{
          `${user.position?.name ? user.position?.name : ""}, ${
            user.department?.name ? user.department?.name : ""
          }`
        }}
      </li>
      <li>
        <strong>Табельный номер:</strong> {{ user.user?.employee_number }}
      </li>
      <li>
        <strong>Модератор: </strong>
        {{ `${user.created_by?.name} ${user.created_by?.last_name}` }}
      </li>
      <li><strong>Телефон номер:</strong> {{ user.phone }}</li>
    </ul>
    <button
      class="button danger"
      v-if="user.user?.is_active"
      @click="deactivateEmployeeByID(user.id ?? userData.id)"
    >
      Удалить учетную запись пользователя
    </button>
    <button
      class="button send"
      v-if="!user.user?.is_active"
      @click="reactivateEmployeeByID(user.id ?? userData.id)"
    >
      Восстоновить учетную запись
    </button>
  </div>
</template>
<style lang="scss"></style>
