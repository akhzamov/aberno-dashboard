<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from "vue";
import { useGlobalStore, useLoaderWatcher } from "@/stores/global";
import type { IWorkDayResponse } from "@/Interfaces/rollCall.interface";
import { fetchRollCalls } from "./info.data";

const globalStore = useGlobalStore();
const rollCallsData = ref<IWorkDayResponse>({});
const error = ref<string | null>(null);
const rollCalls = computed(() => Object.entries(rollCallsData.value));

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
const month = reactive([
  {
    id: 1,
    title: "Январь",
    value: "01",
  },
  {
    id: 2,
    title: "Февраль",
    value: "02",
  },
  {
    id: 3,
    title: "Март",
    value: "03",
  },
  {
    id: 4,
    title: "Апрель",
    value: "04",
  },
  {
    id: 5,
    title: "Май",
    value: "05",
  },
  {
    id: 6,
    title: "Июнь",
    value: "06",
  },
  {
    id: 7,
    title: "Июль",
    value: "07",
  },
  {
    id: 8,
    title: "Август",
    value: "08",
  },
  {
    id: 9,
    title: "Сентябрь",
    value: "09",
  },
  {
    id: 10,
    title: "Октябрь",
    value: "10",
  },
  {
    id: 11,
    title: "Ноябрь",
    value: "11",
  },
  {
    id: 12,
    title: "Декабрь",
    value: "12",
  },
]);
const selectedMonth = ref("");
const year = reactive([
  {
    id: 1,
    title: "2024",
    value: "2024",
  },
  {
    id: 2,
    title: "2025",
    value: "2025",
  },
  {
    id: 3,
    title: "2026",
    value: "2026",
  },
  {
    id: 4,
    title: "2027",
    value: "2027",
  },
  {
    id: 5,
    title: "2028",
    value: "2028",
  },
  {
    id: 6,
    title: "2029",
    value: "2029",
  },
  {
    id: 7,
    title: "2030",
    value: "2030",
  },
]);
const selectedYear = ref("");
const currentMonth = new Date().getMonth() + 1;

useLoaderWatcher();

onMounted(async () => {
  globalStore.setLoading(true);
  selectedMonth.value =
    currentMonth < 10 ? "0" + currentMonth.toString() : currentMonth.toString();
  selectedYear.value = new Date().getFullYear().toString();
  try {
    const response = await fetchRollCalls(
      selectedYear.value,
      selectedMonth.value,
      userData.value.id
    );
    rollCallsData.value = response;
  } catch (err) {
    error.value = "Failed to fetch employees";
  } finally {
    globalStore.setLoading(false);
  }
});

const fetchData = async () => {
  globalStore.setLoading(true);
  try {
    const response = await fetchRollCalls(
      selectedYear.value,
      selectedMonth.value,
      userData.value.id
    );
    rollCallsData.value = response;
  } catch (err) {
    error.value = "Failed to fetch employees";
  } finally {
    globalStore.setLoading(false);
  }
};

watch([selectedMonth, selectedYear], fetchData);

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
  <div class="user-roll-call" v-else>
    <h3 class="user-roll-call__title">Период для просмотра</h3>
    <div class="user-roll-call__selects flex space-x-4 mb-3 mt-3">
      <div class="section__content-filter-select">
        <select
          id="location"
          name="location"
          class="block w-full"
          v-model="selectedMonth"
        >
          <option v-for="item in month" :key="item.id" :value="item.value">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="section__content-filter-select">
        <select
          id="location"
          name="location"
          class="block w-full"
          v-model="selectedYear"
        >
          <option v-for="item in year" :key="item.id" :value="item.value">
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>
    <h3 class="user-roll-call__title">История посещений (перекличка)</h3>
    <div class="user-roll-call__content">
      <div class="section__content-table relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class="text-xs uppercase">
            <tr>
              <th scope="col" class="px-6 py-3">Статус посещения</th>
              <th scope="col" class="px-6 py-3">Время переклички</th>
              <th scope="col" class="px-6 py-3">Коментарии</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="([date, rollCallItem], index) in rollCalls" :key="index">
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
                <span
                  class="section__content-status danger"
                  v-if="rollCallItem.status == null"
                >
                  Не работал
                </span>
              </td>
              <td class="px-6 py-4">{{ date }}</td>
              <td class="px-6 py-4">
                {{ rollCallItem.note ? rollCallItem.note : "Нет заметок" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
