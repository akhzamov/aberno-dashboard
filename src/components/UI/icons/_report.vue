<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: "#010101"
    },
    size: {
        type: String,
        default: "24"
    }
})


const viewBox = ref('0 0 100 100');
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
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" :viewBox="viewBox" ref="svgElement">
        <path fill="currentColor" d="M7 17h2v-7H7zm4 0h2V7h-2zm4 0h2v-4h-2zM3 21V3h18v18zm2-2h14V5H5zm0 0V5z" />
    </svg>
</template>

<style scoped></style>