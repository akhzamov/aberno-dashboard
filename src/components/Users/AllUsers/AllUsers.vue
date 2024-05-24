<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useGlobalStore, useLoaderWatcher } from "@/stores/global";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modals";
import type { IEmployee } from "@/Interfaces/user.interface";
import { fetchEmployees } from "./allUsers.data";
import Pagination from "@/components/UI/Pagination/Pagination.vue";

const globalStore = useGlobalStore();
const authStore = useAuthStore();
const modalStore = useModalStore();
const employees = ref<IEmployee[]>([]);
const error = ref<string | null>(null);
const total = ref(0);
const totalPages = ref(6);
const perPage = ref(10);
const currentPage = ref(1);
const hasMorePages = ref(true);

useLoaderWatcher();

onMounted(async () => {
  globalStore.setLoading(true);
  try {
    const response = await fetchEmployees(currentPage.value, totalPages.value);
    employees.value = response.data;

    total.value = response.count;
  } catch (err) {
    error.value = "Failed to fetch employees";
  } finally {
    globalStore.setLoading(false);
  }
});

const handlePageChange = async (page: number) => {
  globalStore.setLoading(true);
  currentPage.value = page;
  try {
    const response = await fetchEmployees(currentPage.value, totalPages.value);
    employees.value = response.data;
    total.value = response.count;
  } catch (err) {
    error.value = "Failed to fetch employees";
  } finally {
    globalStore.setLoading(false);
  }
};
</script>
<template>
  <SuccessModal
    v-if="modalStore.successModal"
    title="Удачно"
    :text="modalStore.successModalText"
  />
  <DangerModal
    v-if="modalStore.dangerModal"
    title="Ошибка"
    :text="modalStore.dangerModalText"
  />
  <WarningModal
    v-if="modalStore.warningModal"
    title="Предупреждение"
    :text="modalStore.warningModalText"
  />
  <div class="loader-wrap" v-if="globalStore.loader">
    <Loader />
  </div>
  <div class="all-users" v-else>
    <div class="section__content-filter">
      <div class="section__content-filter-select">
        <select id="countries" class="block w-full">
          <option selected>Choose a country</option>
          <option value="US">United States</option>
        </select>
      </div>
      <div class="section__content-filter-input">
        <img src="@/assets/img/magnify.svg" alt="" />
        <input type="text" placeholder="Поиск..." />
      </div>
      <RouterLink
        :to="{
          name: 'UsersCreate',
          state: {
            userData: {
              title: 'Добавить нового пользователя',
              admin: false,
            },
          },
        }"
        class="button send"
      >
        <ico_plus size="15" color="#fff"></ico_plus> Добавить пользователя
      </RouterLink>
    </div>
    <div class="all-users__content">
      <div class="section__content-table relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class="text-xs uppercase">
            <tr>
              <th scope="col" class="px-6 py-3">Имя пользователя</th>
              <th scope="col" class="px-6 py-3">Статус</th>
              <th scope="col" class="px-6 py-3">Модератор</th>
              <th scope="col" class="px-6 py-3">Дата создания</th>
              <th scope="col" class="px-6 py-3">Дата изменение</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <RouterLink
                :to="{
                  name: 'UsersEdit',
                  params: {
                    id: employee.id,
                  },
                  state: {
                    userData: {
                      title: 'Редактировать пользователя',
                      admin: false,
                      id: employee.id,
                    },
                  },
                }"
              />
              <th scope="row" class="px-6 py-4 font-medium flex flex-col">
                {{ employee.user.name }} {{ employee.user.last_name }}
                <span>
                  {{ employee.department.name }}
                  {{
                    employee.position ? employee.position.name : "Не определено"
                  }}
                </span>
              </th>
              <td class="px-6 py-4 statuses">
                <span
                  class="section__content-status success"
                  v-if="employee.user.is_active"
                  >Активный</span
                >
                <span
                  class="section__content-status danger"
                  v-if="!employee.user.is_active"
                  >Удален</span
                >
              </td>
              <td class="px-6 py-4">
                {{
                  employee.created_by.name == "Dev" &&
                  employee.created_by.last_name == null
                    ? "Musait Technologies"
                    : `${employee.created_by.name} ${employee.created_by.last_name}`
                }}
              </td>
              <td class="px-6 py-4">
                {{ new Date(employee.created_at).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4">
                {{ new Date(employee.updated_at).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :totalPages="totalPages"
        :total="total"
        :perPage="perPage"
        :currentPage="currentPage"
        :hasMorePages="hasMorePages"
        @pagechanged="handlePageChange"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
