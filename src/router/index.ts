import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/auth.vue'
import DefaultLayout from '@/layouts/default.vue'
import HomeView from '@/views/Home/index.vue'
import AuthView from '@/views/Auth/index.vue'
import RollCall from '@/views/RollCall/index.vue'
import Users from '@/views/Users/index.vue'
import Report from '@/views/Report/index.vue'
import Settings from '@/views/Settings/index.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/authorization',
			component: AuthLayout,
			children: [
				{
					path: '',
					name: 'Authorization',
					component: AuthView,
					meta: {
						guard: false
					}
				},
			],
		},
		{
			path: '/',
			component: DefaultLayout,
			children: [
				{
					path: '',
					name: 'Home',
					component: HomeView,
					meta: {
						guard: true
					}
				},
			],
		},
		{
			path: '/roll-call',
			component: DefaultLayout,
			children: [
				{
					path: '',
					name: 'Roll-Call',
					component: RollCall,
					meta: {
						guard: true
					}
				},
			],
		},
		{
			path: '/users',
			component: DefaultLayout,
			children: [
				{
					path: '',
					name: 'Users',
					component: Users,
					meta: {
						guard: true
					}
				},
			],
		},
		{
			path: '/report',
			component: DefaultLayout,
			children: [
				{
					path: '',
					name: 'Report',
					component: Report,
					meta: {
						guard: true
					}
				},
			],
		},
		{
			path: '/settings',
			component: DefaultLayout,
			children: [
				{
					path: '',
					name: 'Settings',
					component: Settings,
					meta: {
						guard: true
					}
				},
			],
		},
	],
})

router.beforeEach((to, from) => {
	if (to.meta.guard && !useAuthStore().user.is_active) {
		useAuthStore().getMe()
	} else {
		router.forward()
	}
})


export default router
