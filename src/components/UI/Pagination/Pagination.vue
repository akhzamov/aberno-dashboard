<template>
  <nav
    class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-full"
  >
    <div class="-mt-px flex w-0 flex-1">
      <a
        href="#"
        @click.prevent="onClickPreviousPage"
        :class="{
          'inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium hover:border-gray-300':
            !isInFirstPage,
          'inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium cursor-not-allowed text-secondary-text-color':
            isInFirstPage,
        }"
      >
        <ArrowLongLeftIcon
          class="mr-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Назад
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a
        v-for="page in pages"
        :key="page"
        href="#"
        @click.prevent="onClickPage(page)"
        :class="{
          'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium': true,
          'border-primary-color text-primary-color': isPageActive(page),
          'border-transparent text-secondary-text-color hover:text-main-text-color hover:border-gray-300':
            !isPageActive(page),
        }"
        :aria-current="isPageActive(page) ? 'page' : undefined"
        >{{ page }}</a
      >
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a
        href="#"
        @click.prevent="onClickNextPage"
        :class="{
          'inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium hover:border-gray-300':
            !isInLastPage,
          'inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium cursor-not-allowed text-secondary-text-color':
            isInLastPage,
        }"
      >
        Вперед
        <ArrowLongRightIcon
          class="ml-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </a>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/20/solid";
import { useGlobalStore } from "@/stores/global";

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 5,
  },
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["pagechanged"]);

const totalPages = computed(() => {
  return Math.ceil(props.total / props.perPage);
});

const startPage = computed(() => {
  let start = Math.max(
    props.currentPage - Math.floor(props.maxVisibleButtons / 2),
    1
  );
  if (start + props.maxVisibleButtons - 1 > totalPages.value) {
    start = Math.max(totalPages.value - props.maxVisibleButtons + 1, 1);
  }
  return start;
});

const endPage = computed(() => {
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    totalPages.value
  );
});

const pages = computed(() => {
  const range = [];
  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push(i);
  }
  return range;
});

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isInLastPage = computed(() => {
  return props.currentPage === totalPages.value;
});

const onClickFirstPage = () => {
  emit("pagechanged", 1);
};

const onClickPreviousPage = () => {
  if (props.currentPage > 1) {
    emit("pagechanged", props.currentPage - 1);
  }
};

const onClickPage = (page: number) => {
  emit("pagechanged", page);
};

const onClickNextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit("pagechanged", props.currentPage + 1);
  }
};

const onClickLastPage = () => {
  emit("pagechanged", totalPages.value);
};

const isPageActive = (page: number) => {
  return props.currentPage === page;
};

// Watch for page changes to set the loading state
const globalStore = useGlobalStore();
watch(
  () => props.currentPage,
  (newPage, oldPage) => {
    if (newPage !== oldPage) {
      globalStore.setLoading(true);
    }
  }
);
</script>

<style lang="scss" scoped>
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

nav {
  background-color: $default-color;
  .border-gray-200 {
    border-color: $body-bg-color;
  }

  .text-primary-color {
    color: $primary-color;
  }

  .text-secondary-text-color {
    color: $secondary-text-color;
  }

  .text-main-text-color {
    color: $main-text-color;
  }

  .border-primary-color {
    border-color: $primary-color;
  }

  .hover\:border-gray-300:hover {
    border-color: $secondary-text-color;
  }

  .hover\:text-main-text-color:hover {
    color: $main-text-color;
  }

  .cursor-not-allowed {
    cursor: not-allowed;
  }
}
</style>
