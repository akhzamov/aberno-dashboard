import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { baseUrl, defHeader } from "@/api";
import axios from "axios";
import router from "@/router";
import { useGlobalStore } from "./global";

import type {
  IRole,
  IUser,
  ICurrentEmployee,
  IEmployeeData,
} from "@/Interfaces/user.interface";

interface AuthResponse {
  access_token: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    successAlert: false,
    successAlertText: "",
    infoAlert: false,
    infoAlertText: "",
    dangerAlert: false,
    dangerAlertText: "",
    warningAlert: false,
    warningAlertText: "",
    user: {} as ICurrentEmployee,
    loader: false,
    organizationID: null as number | null,
  }),
  actions: {
    async login(username: string, password: string) {
      this.loader = true;
      try {
        const res = await axios.post<AuthResponse>(
          `${baseUrl}/auth/token`,
          {
            username,
            password,
          },
          {
            headers: {
              ...defHeader,
            },
          }
        );

        sessionStorage.setItem("access_token", res.data.access_token);
        this.getMe();
        router.push("/");
        this.loader = false;
      } catch (err) {
        this.loader = false;
        this.dangerAlert = true;
        this.dangerAlertText = "Неверный логин или пароль";
        setTimeout(() => {
          this.dangerAlert = false;
          this.dangerAlertText = "";
        }, 3500);
        console.error(err);
      }
    },
    async getMe() {
      const globalStore = useGlobalStore();
      globalStore.setLoading(true);
      this.loader = true;
      try {
        const res = await axios.get<ICurrentEmployee>(
          `${baseUrl}/organization/employee/current/`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
              ...defHeader,
            },
          }
        );

        this.user = res.data;
        this.organizationID = res.data.organization_id;
        globalStore.setLoading(false);
        this.loader = false;
        const authGuard = router.currentRoute.value.meta.guard;
        if (
          (authGuard && !this.user.user.is_active && !this.isSuperAdmin) ||
          !this.isAdmin
        ) {
          router.push("/authorization");
          this.dangerAlert = true;
          this.dangerAlertText = "Авторизуйтесь для входа";
          setTimeout(() => {
            this.dangerAlert = false;
            this.dangerAlertText = "";
          }, 3500);
        } else {
          router.forward();
          router.go(1);
        }
      } catch (err) {
        globalStore.setLoading(false);
        this.loader = false;
        this.dangerAlert = true;
        this.dangerAlertText = "Авторизуйтесь для входа";
        setTimeout(() => {
          this.dangerAlert = false;
          this.dangerAlertText = "";
        }, 3500);
        router.push("/authorization");
        console.error(err);
      }
    },
    check(value: string) {
      console.log(value);
    },
  },
  getters: {
    isSuperAdmin: (state) => {
      let currentUser = state.user?.user;
      return currentUser && currentUser.roles
        ? currentUser.roles.some((role: IRole) => role.id === 2)
        : false;
    },
    isAdmin: (state) => {
      let currentUser = state.user?.user;
      return currentUser && currentUser.roles
        ? currentUser.roles.some((role: IRole) => role.id === 1)
        : false;
    },
  },
});
