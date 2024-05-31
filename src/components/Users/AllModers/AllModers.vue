<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { useGlobalStore, useLoaderWatcher } from "@/stores/global";
import { useModalStore } from "@/stores/modals";
import type { IEmployee } from "@/Interfaces/user.interface";
import { fetchModers } from "./allModers.data";
import Pagination from "@/components/UI/Pagination/Pagination.vue";
import { debounce } from "@/api";

const globalStore = useGlobalStore();
const modalStore = useModalStore();
const moders = ref<IEmployee[]>([]);
const error = ref<string | null>(null);
const total = ref(0);
const perPage = ref(6);
const currentPage = ref(1);
const maxVisibleButtons = ref(4);

useLoaderWatcher();

const debouncedFetchEmployees = debounce(
  async (currentPage: number, perPage: number) => {
    const response = await fetchModers(currentPage, perPage);
    moders.value = response.data;
    total.value = response.count;
  },
  300
);

watch(
  () => globalStore.searchModers,
  async (newValue: string) => {
    if (newValue.trim() !== "") {
      debouncedFetchEmployees(currentPage.value, perPage.value);
    } else {
      globalStore.searchModers = "";
      const res = await fetchModers(currentPage.value, perPage.value);
      moders.value = res.data;
      total.value = res.count;
    }
  },
  { immediate: true }
);

onMounted(async () => {
  globalStore.setLoading(true);
  try {
    const response = await fetchModers(currentPage.value, perPage.value);
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
    const response = await fetchModers(currentPage.value, perPage.value);
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
      <div class="section__content-filter-input">
        <img src="@/assets/img/magnify.svg" alt="" />
        <input
          type="text"
          placeholder="Поиск..."
          v-model="globalStore.searchModers"
        />
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
              <th scope="col" class="px-6 py-3">Табельный номер</th>
              <th scope="col" class="px-6 py-3">Статус</th>
              <th scope="col" class="px-6 py-3">Роль</th>
              <th scope="col" class="px-6 py-3">Дата создания</th>
              <th scope="col" class="px-6 py-3">Дата изменение</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="moders.length == 0">
              <th scope="row" class="px-6 py-4 font-medium flex flex-col">
                Ничего не найдено
              </th>
            </tr>
            <tr class="" v-for="moder in moders" :key="moder.id">
              <RouterLink
                :to="{
                  name: 'UsersInfo',
                  params: {
                    id: moder.id,
                  },
                  state: {
                    userData: {
                      title: 'Информация о модераторе',
                      admin: true,
                      id: moder.id,
                    },
                  },
                }"
              />
              <th
                scope="row"
                class="px-6 py-4 font-medium flex flex-row items-center gap-3"
              >
                <img
                  src="@/assets/img/user-avatar.svg"
                  alt=""
                  class="w-12 h-12"
                  v-if="moder.user.is_active"
                />
                <img
                  src="@/assets/img/user-avatar-red.svg"
                  alt=""
                  class="w-12 h-12"
                  v-if="!moder.user.is_active"
                />
                <strong class="flex flex-col">
                  {{ `${moder.user.name} ${moder.user.last_name}` }}
                  <span>
                    {{ moder.department ? moder.department.name : " " }}
                    {{ moder.position ? moder.position.name : " " }}
                  </span>
                </strong>
              </th>
              <th scope="row" class="px-6 py-4 font-medium">
                {{
                  moder.created_by
                    ? moder.created_by.name != ""
                      ? moder.created_by.name
                      : "не."
                    : "Нет"
                }}

                {{
                  moder.created_by
                    ? moder.created_by.last_name != ""
                      ? moder.created_by.last_name
                      : "не."
                    : ""
                }}
              </th>
              <th scope="row" class="px-6 py-4 font-medium">
                {{ moder.user.employee_number }}
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
        :maxVisibleButtons="maxVisibleButtons"
        :total="total"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="handlePageChange"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
