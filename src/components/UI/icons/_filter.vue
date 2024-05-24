<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#010101",
  },
  size: {
    type: String,
    default: "24",
  },
});

const viewBox = ref("0 0 100 100");
const svgElement = ref<SVGSVGElement | null>(null);

const calculateViewBox = () => {
  if (svgElement.value) {
    const bbox = svgElement.value.getBBox();
    viewBox.value = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
  }
};

onMounted(() => {
  calculateViewBox();
});

const size = computed(() => props.size);

watch(size, () => {
  calculateViewBox();
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    ref="svgElement"
  >
    <path :fill="color" d="M6 13h12v-2H6M3 6v2h18V6M10 18h4v-2h-4z" />
  </svg>
</template>

<style scoped></style>
