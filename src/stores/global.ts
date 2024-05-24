import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { baseUrl, defHeader } from "@/api";
import axios from "axios";
import router from "@/router";
import { watch } from "vue";
import type {
  IDepartment,
  IPosition,
  IRole,
} from "@/Interfaces/user.interface";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    activeTab: 1,
    loader: false,
    successAlert: false,
    successAlertText: "",
    infoAlert: false,
    infoAlertText: "",
    dangerAlert: false,
    dangerAlertText: "",
    warningAlert: false,
    warningAlertText: "",
    positions: [] as IPosition[] | null,
    departments: [] as IDepartment[] | null,
    roles: [] as IRole[] | null,
  }),
  actions: {
    setLoading(status: boolean) {
      this.loader = status;
    },
  },
});

export const useLoaderWatcher = () => {
  const globalStore = useGlobalStore();

  watch(
    () => globalStore.loader,
    (newValue) => {
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    { immediate: true }
  );
};
