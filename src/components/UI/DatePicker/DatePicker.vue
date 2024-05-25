<script lang="ts" setup>
import { ref, computed, watch, defineEmits, defineProps } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: string;
}>();

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
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const selectedDate = ref<Date | null>(null);
const showDatePicker = ref(false);

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());

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
  showDatePicker.value = false;
  emit("update:modelValue", formattedDate.value);
};

const isSelectedDay = (day: number) => {
  return (
    selectedDate.value &&
    selectedDate.value.getDate() === day &&
    selectedDate.value.getMonth() === currentMonth.value &&
    selectedDate.value.getFullYear() === currentYear.value
  );
};

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
      v-model="formattedDate"
      class="bg-default-color border border-secondary-text-color text-main-text-color text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full pl-10 p-2.5"
      placeholder="Выберите дату"
      @focus="showDatePicker = true"
      readonly
    />
    <!-- Calendar -->
    <div
      v-if="showDatePicker"
      class="absolute z-10 mt-1 bg-default-color border border-secondary-text-color rounded-lg shadow-lg"
    >
      <div
        class="flex justify-between p-2 bg-body-bg-color border-b border-secondary-text-color"
      >
        <button
          @click="prevMonth"
          class="px-2 py-1 text-main-text-color hover:bg-hover-bg-color rounded"
        >
          ←
        </button>
        <span>{{ months[currentMonth.value] }} {{ currentYear.value }}</span>
        <button
          @click="nextMonth"
          class="px-2 py-1 text-main-text-color hover:bg-hover-bg-color rounded"
        >
          →
        </button>
      </div>
      <div class="grid grid-cols-7 gap-1 p-2">
        <div
          v-for="day in weekDays"
          :key="day"
          class="text-center font-semibold text-secondary-text-color"
        >
          {{ day }}
        </div>
        <div
          v-for="(day, index) in daysInMonth"
          :key="index"
          class="text-center p-2 cursor-pointer rounded hover:bg-hover-bg-color"
          :class="{ 'bg-primary-color text-default-color': isSelectedDay(day) }"
          @click="selectDate(day)"
        >
          {{ day }}
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
