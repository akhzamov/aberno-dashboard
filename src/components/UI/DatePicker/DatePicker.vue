<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useGlobalStore } from "@/stores/global";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const selectedDate = ref<Date | null>(null);
const showDatePicker = ref(false);
const showMonthPicker = ref(false);
const showYearPicker = ref(false);

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());

const globalStore = useGlobalStore();

const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  const year = selectedDate.value.getFullYear();
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

const daysInMonth = computed(() => {
  const days = [];
  const date = new Date(currentYear.value, currentMonth.value, 1);
  while (date.getMonth() === currentMonth.value) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }
  return days;
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentYear.value -= 1;
    currentMonth.value = 11;
  } else {
    currentMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentYear.value += 1;
    currentMonth.value = 0;
  } else {
    currentMonth.value += 1;
  }
};

const selectDate = (day: number) => {
  selectedDate.value = new Date(currentYear.value, currentMonth.value, day);
  const formatted = formattedDate.value;
  globalStore.setSelectedDate(formatted);
  localStorage.setItem("selectedDate", formatted);
  showDatePicker.value = false;
};

const isSelectedDay = (day: number) => {
  return (
    selectedDate.value &&
    selectedDate.value.getDate() === day &&
    selectedDate.value.getMonth() === currentMonth.value &&
    selectedDate.value.getFullYear() === currentYear.value
  );
};

const selectMonth = (monthIndex: number) => {
  currentMonth.value = monthIndex;
  showMonthPicker.value = false;
  showYearPicker.value = false;
};

const selectYear = (year: number) => {
  currentYear.value = year;
  showYearPicker.value = false;
  showMonthPicker.value = false;
};

onMounted(() => {
  const storedDate = localStorage.getItem("selectedDate");
  if (storedDate) {
    const date = new Date(storedDate);
    if (!isNaN(date.getTime())) {
      selectedDate.value = date;
      currentYear.value = date.getFullYear();
      currentMonth.value = date.getMonth();
      globalStore.setSelectedDate(storedDate);
    }
  }
});

watch(selectedDate, (newDate) => {
  console.log("Selected Date:", formattedDate.value);
});
</script>

<template>
  <div class="relative max-w-sm">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
        />
      </svg>
    </div>
    <input
      type="text"
      :value="formattedDate"
      class="bg-default-color border border-secondary-text-color text-main-text-color text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full pl-10 p-2.5"
      placeholder="Выберите дату"
      @focus="showDatePicker = true"
      readonly
    />
    <!-- Calendar -->
    <div
      v-if="showDatePicker"
      class="absolute z-10 mt-1 bg-default-color border border-secondary-text-color rounded-lg shadow-lg w-80 p-4"
    >
      <div class="flex justify-between items-center mb-2">
        <button @click="prevMonth" class="text-main-text-color">←</button>
        <div>
          <span
            @click="showMonthPicker = !showMonthPicker"
            class="cursor-pointer"
            >{{ months[currentMonth] }}</span
          >
          /
          <span
            @click="showYearPicker = !showYearPicker"
            class="cursor-pointer"
            >{{ currentYear }}</span
          >
        </div>
        <button @click="nextMonth" class="text-main-text-color">→</button>
      </div>

      <div v-if="showMonthPicker" class="grid grid-cols-3 gap-2 mb-2">
        <div
          v-for="(month, index) in months"
          :key="index"
          class="text-center cursor-pointer p-1 rounded hover:bg-hover-bg-color"
          @click="selectMonth(index)"
        >
          {{ month }}
        </div>
      </div>

      <div v-if="showYearPicker" class="grid grid-cols-3 gap-2 mb-2">
        <div
          v-for="year in years"
          :key="year"
          class="text-center cursor-pointer p-1 rounded hover:bg-hover-bg-color"
          @click="selectYear(year)"
        >
          {{ year }}
        </div>
      </div>

      <div v-if="!showMonthPicker && !showYearPicker">
        <div class="grid grid-cols-7 gap-1 text-center mb-2">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-secondary-text-color"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center">
          <div
            v-for="day in daysInMonth"
            :key="day"
            class="p-2 cursor-pointer rounded"
            :class="{
              'bg-primary-color text-default-color': isSelectedDay(day),
              'text-gray-300': day <= 0,
            }"
            @click="selectDate(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$default-color: #ffffff;
$body-bg-color: #f5f6fa;
$primary-color: #027bff;
$main-text-color: #474747;
$secondary-text-color: #707b81;
$success-color: #06a561;
$success-bg-color: #c4f8e2;
$danger-color: #ff3b30;
$danger-bg-color: #fedada;
$warning-color: #ce8228;
$warning-bg-color: #faf1db;
$info-color: #007aff;
$info-bg-color: #d4e3f3;
$stable-color: #bc7710;
$stable-bg-color: #fdffb0;

.bg-default-color {
  background-color: $default-color;
}

.text-main-text-color {
  color: $main-text-color;
}

.text-secondary-text-color {
  color: $secondary-text-color;
}

.border-secondary-text-color {
  border-color: $secondary-text-color;
}

.focus\:ring-primary-color {
  --tw-ring-color: $primary-color;
}

.focus\:border-primary-color {
  --tw-border-opacity: 1;
  border-color: $primary-color;
}

.hover-bg-color {
  background-color: $info-bg-color;
}

.bg-primary-color {
  background-color: $primary-color;
}

.text-default-color {
  color: $default-color;
}

.hover\:bg-hover-bg-color:hover {
  background-color: $info-bg-color;
}
</style>
