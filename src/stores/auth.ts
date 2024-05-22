import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { baseUrl, defHeader } from '@/api';
import axios from 'axios';
import router from '@/router';

interface AuthResponse {
    access_token: string;
}
interface getMeResponse {
    id: number;
    name: string;
    last_name: string;
    username: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    roles: object[];
    permissions: object[];
}

interface User {
    // Определите свойства пользователя здесь
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        successAlert: false,
        successAlertText: '',
        infoAlert: false,
        infoAlertText: '',
        dangerAlert: false,
        dangerAlertText: '',
        warningAlert: false,
        warningAlertText: '',
        user: {} as getMeResponse,
        loader: false
    }),
    actions: {
        async login(username: string, password: string) {
            this.loader = true
            try {
                const res = await axios.post<AuthResponse>(`${baseUrl}/auth/token`, {
                    username,
                    password,
                }, {
                    headers: {
                        ...defHeader,
                    },
                });

                sessionStorage.setItem('access_token', res.data.access_token);
                router.push('/')
                this.loader = false
            } catch (err) {
                this.loader = false
                this.dangerAlert = true;
                this.dangerAlertText = 'Неверный логин или пароль'
                setTimeout(() => {
                    this.dangerAlert = false;
                    this.dangerAlertText = ''
                }, 3500);
                console.error(err);
            }
        },
        async getMe() {
            this.loader = true
            try {
                const res = await axios.get<getMeResponse>(`${baseUrl}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                        ...defHeader,
                    },
                });

                this.user = res.data
                this.loader = false
                const authGuard = router.currentRoute.value.meta.guard
                if (authGuard && !this.user.is_active) {
                    router.push('/authorization')
                    this.dangerAlert = true;
                    this.dangerAlertText = 'Авторизуйтесь для входа'
                    setTimeout(() => {
                        this.dangerAlert = false;
                        this.dangerAlertText = ''
                    }, 3500);
                } else {
                    router.forward()
                }
            } catch (err) {
                this.loader = false
                this.dangerAlert = true;
                this.dangerAlertText = 'Авторизуйтесь для входа'
                setTimeout(() => {
                    this.dangerAlert = false;
                    this.dangerAlertText = ''
                }, 3500);
                router.push('/authorization')
                console.error(err);
            }
        },

    }
});
