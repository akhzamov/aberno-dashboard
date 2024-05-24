<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useGlobalStore, useLoaderWatcher } from "@/stores/global";
import { useAuthStore } from "@/stores/auth";
import type { IWorkStatus } from "@/Interfaces/rollCall.interface";
import { fetchRollCalls } from "./rollCall.data";
import Pagination from "@/components/UI/Pagination/Pagination.vue";

const globalStore = useGlobalStore();
const authStore = useAuthStore();
const rollCalls = ref<IWorkStatus[]>([]);
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
    const response = await fetchRollCalls(
      currentPage.value,
      totalPages.value,
      null,
      "",
      null
    );
    rollCalls.value = response.data;

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
    const response = await fetchRollCalls(
      currentPage.value,
      totalPages.value,
      null,
      "",
      null
    );
    rollCalls.value = response.data;
    total.value = response.count;
  } catch (err) {
    error.value = "Failed to fetch employees";
  } finally {
    globalStore.setLoading(false);
  }
};

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
</script>
<template>
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
    </div>
    <div class="all-users__content">
      <div class="section__content-table relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class="text-xs uppercase">
            <tr>
              <th scope="col" class="px-6 py-3">Имя пользователя</th>
              <th scope="col" class="px-6 py-3">Статус</th>
              <th scope="col" class="px-6 py-3">Время переклички</th>
              <th scope="col" class="px-6 py-3">Коментарии</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rollCallItem in rollCalls" :key="rollCallItem.id">
              <th scope="row" class="px-6 py-4 font-medium flex flex-col">
                {{
                  rollCallItem.employee.user.name
                    ? rollCallItem.employee.user.name
                    : "Имя не задана"
                }}
                {{
                  rollCallItem.employee.user.last_name
                    ? rollCallItem.employee.user.last_name
                    : ""
                }}
                <span>
                  {{ rollCallItem.employee.department.name }}
                  {{
                    rollCallItem.employee.position
                      ? rollCallItem.employee.position.name
                      : "Не определено"
                  }}
                </span>
              </th>
              <td class="px-6 py-4 statuses">
                <span
                  class="section__content-status success"
                  v-if="rollCallItem.status == 'ON_WORK'"
                >
                  Пришел вовремя
                </span>
                <span
                  class="section__content-status danger"
                  v-if="rollCallItem.status == 'ABSENT'"
                  >Не пришел</span
                >
                <span
                  class="section__content-status danger"
                  v-if="rollCallItem.status == 'LATE'"
                  >Опоздал</span
                >
                <span
                  class="section__content-status stable"
                  v-if="rollCallItem.status == 'REASONED'"
                  >Есть причина</span
                >
                <span
                  class="section__content-status info"
                  v-if="rollCallItem.status == 'SICK'"
                  >Больничный</span
                >
                <span
                  class="section__content-status warning"
                  v-if="rollCallItem.status == 'OFF_DAY'"
                >
                  Выходной день
                </span>
              </td>
              <td class="px-6 py-4">
                {{ formatTime(rollCallItem.created_at) }},
                {{ new Date(rollCallItem.created_at).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4">
                {{ rollCallItem.note ? rollCallItem.note : "Нет заметок" }}
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