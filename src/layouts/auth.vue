<script lang="ts" setup>
import { defineComponent, onMounted } from 'vue'
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()


defineComponent({
	name: 'Auth-layout',
})
</script>

<template>
	<div class="auth-layout">
		<RouterView />
	</div>
</template>

<style scoped></style>
