<script lang="ts" setup>
import { defineComponent, onMounted } from 'vue'
import { useAuthStore } from "@/stores/auth"
import Navbar from '@/components/Navbar/Navbar.vue'
import Aside from '@/components/Aside/Aside.vue'

const authStore = useAuthStore()

defineComponent({
	name: 'Default-layout',
})
</script>

<template>
	<Navbar />
	<div class="default-layout">
		<Aside />
		<main class="default-layout__main">
			<RouterView />
		</main>
	</div>
</template>

<style scoped></style>
