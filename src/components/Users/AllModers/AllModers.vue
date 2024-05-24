<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useGlobalStore, useLoaderWatcher } from "@/stores/global";
import { useModalStore } from "@/stores/modals";
import type { IEmployee } from "@/Interfaces/user.interface";
import { fetchModers } from "./allModers.data";
import Pagination from "@/components/UI/Pagination/Pagination.vue";

const globalStore = useGlobalStore();
const modalStore = useModalStore();
const moders = ref<IEmployee[]>([]);
const error = ref<string | null>(null);
const total = ref(0);
const totalPages = ref(8);
const perPage = ref(10);
const currentPage = ref(1);
const hasMorePages = ref(true);

useLoaderWatcher();

onMounted(async () => {
  globalStore.setLoading(true);
  try {
    const response = await fetchModers(currentPage.value, totalPages.value);
    moders.value = response.data;

    total.value = response.count;
  } catch (err) {
    error.value = "Failed to fetch moders";
  } finally {
    globalStore.setLoading(false);
  }
});

const handlePageChange = async (page: number) => {
  globalStore.setLoading(true);
  currentPage.value = page;
  try {
    const response = await fetchModers(currentPage.value, totalPages.value);
    moders.value = response.data;
    total.value = response.count;
  } catch (err) {
    error.value = "Failed to fetch moders";
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
  <div class="all-moders">
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
            userData: { title: 'Добавить нового модератора', admin: true },
          },
        }"
        class="button send"
      >
        <ico_plus size="19" color="#fff"></ico_plus> Добавить модератора
      </RouterLink>
    </div>
    <div class="all-moders__content">
      <div class="section__content-table relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class="text-xs uppercase">
            <tr>
              <th scope="col" class="px-6 py-3">Имя администратора</th>
              <th scope="col" class="px-6 py-3">Cоздатель</th>
              <th scope="col" class="px-6 py-3">Логин</th>
              <th scope="col" class="px-6 py-3">Статус</th>
              <th scope="col" class="px-6 py-3">Роль</th>
              <th scope="col" class="px-6 py-3">Дата создания</th>
              <th scope="col" class="px-6 py-3">Дата изменение</th>
            </tr>
          </thead>
          <tbody>
            <tr class="" v-for="moder in moders" :key="moder.id">
              <RouterLink
                :to="{
                  name: 'UsersEdit',
                  params: {
                    id: moder.id,
                  },
                  state: {
                    userData: {
                      title: 'Редактировать модератора',
                      admin: true,
                      id: moder.id,
                    },
                  },
                }"
              />
              <th scope="row" class="px-6 py-4 font-medium flex flex-col">
                {{
                  moder.user.name == "Dev" && moder.user.last_name == null
                    ? "Musait Technologies"
                    : `${moder.user.name} ${moder.user.last_name}`
                }}
                <span>
                  {{ moder.department.name }}
                  {{ moder.position ? moder.position.name : "Не определено" }}
                </span>
              </th>
              <th scope="row" class="px-6 py-4 font-medium">
                {{
                  moder.created_by.name == "Dev" &&
                  moder.created_by.last_name == null
                    ? "Musait Technologies"
                    : `${moder.created_by.name} ${moder.created_by.last_name}`
                }}
              </th>
              <th scope="row" class="px-6 py-4 font-medium">
                {{ moder.user.username }}
              </th>
              <td class="px-6 py-4 statuses">
                <span
                  class="section__content-status success"
                  v-if="moder.user.is_active"
                  >Активный</span
                >
                <span
                  class="section__content-status danger"
                  v-if="!moder.user.is_active"
                  >Удален</span
                >
              </td>
              <td class="px-6 py-4">
                {{
                  moder.user.roles && moder.user.roles.length > 0
                    ? moder.user.roles[moder.user.roles.length - 1].name
                    : "No Role"
                }}
              </td>
              <td class="px-6 py-4">
                {{ new Date(moder.user.created_at).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4">
                {{ new Date(moder.user.updated_at).toLocaleDateString() }}
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
