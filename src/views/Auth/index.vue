<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { baseUrl, defHeader } from '@/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'


const schema = yup.object({
	login: yup
		.string()
		.required('Введите логин')
		.min(3, 'Логин не должен быть меньше 3-ех символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.min(6, 'Пароль не должен быть меньше 6-и символов'),
})

interface IUser {
	login: string
	password: string
}

const { values, handleSubmit, meta, handleReset, defineField, errors } =
	useForm<IUser>({
		validationSchema: schema,
	})

const [login, loginAttrs] = defineField('login')
const [password, passwordAttrs] = defineField('password')

const authStore = useAuthStore()
let loginSuccess = ref(false)
let loginError = ref(false)

const onSubmit = handleSubmit(async (values) => {
	authStore.login(values.login, values.password)
})

defineComponent({
	name: 'Authorization',
})
</script>

<template>
	<section class="auth">
		<div class="container">
			<div class="auth__logo">
				<img src="@/assets/img/Aberno-logo-white.svg" alt="" />
				<a class="auth__logo-author" href="https://musait.tech" target="_blank">
					Musait Technologies
				</a>
			</div>
			<form class="auth__form" @submit.prevent="onSubmit" v-if="!authStore.loader">
				<DangerAlert title="Ошибка" :text="authStore.dangerAlertText" v-if="authStore.dangerAlert" />
				<h2 class="auth__form-title">Войдите в систему</h2>
				<p class="auth__form-subtitle">
					Для входа в свой аккаунт введите свои данные
				</p>
				<div class="input-group">
					<label class="input-group__label" for="login">Логин</label>
					<input name="login" v-model="login" v-bind="loginAttrs" class="input-group__input" type="text"
						placeholder="Введите логин" />
					<span class="input-group__span" :class="{ active: errors.password }">
						{{ errors.login }}
					</span>
				</div>
				<div class="input-group">
					<label class="input-group__label" for="password">Пароль</label>
					<input name="password" v-model="password" v-bind="passwordAttrs" class="input-group__input"
						type="password" placeholder="Введите пароль" />
					<span class="input-group__span" :class="{ active: errors.password }">
						{{ errors.password }}
					</span>
				</div>
				<button class="button send" type="submit">Войти</button>
			</form>
			<form class="auth__form" v-if="authStore.loader">
				<Loader />
			</form>
		</div>
	</section>
</template>

<style scoped></style>
