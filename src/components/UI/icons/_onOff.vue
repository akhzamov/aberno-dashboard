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
        <path fill="currentColor"
            d="M11 13V3h2v10zm1 8q-1.85 0-3.488-.712T5.65 18.35t-1.937-2.863T3 12q0-2 .825-3.775T6.15 5.15l1.4 1.4q-1.2 1-1.875 2.425T5 12q0 2.9 2.05 4.95T12 19q2.925 0 4.963-2.05T19 12q0-1.6-.663-3.025T16.45 6.55l1.4-1.4q1.5 1.3 2.325 3.075T21 12q0 1.85-.713 3.488t-1.925 2.862t-2.85 1.938T12 21" />
    </svg>
</template>

<style scoped></style>