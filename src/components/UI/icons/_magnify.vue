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
    <path
      :fill="color"
      d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
    />
  </svg>
</template>

<style scoped></style>
