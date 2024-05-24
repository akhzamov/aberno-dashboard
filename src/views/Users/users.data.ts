import { useGlobalStore } from "@/stores/global";
import { baseUrl, defHeader } from "@/api";
import type {
  IPosition,
  IDepartment,
  IRole,
} from "@/Interfaces/user.interface";
import axios from "axios";

export const getPositions = async () => {
  const globalStore = useGlobalStore();
  globalStore.setLoading(true);
  try {
    const res = await axios.get<IPosition[]>(`${baseUrl}/admin/positions`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        ...defHeader,
      },
    });
    globalStore.positions = res.data;
    globalStore.setLoading(false);
  } catch (err) {
    globalStore.setLoading(false);
    globalStore.dangerAlert = true;
    globalStore.dangerAlertText = "Ошибка сервера";
    setTimeout(() => {
      globalStore.dangerAlert = false;
      globalStore.dangerAlertText = "";
    }, 3500);
    console.error(err);
  }
};

export const getDepartments = async () => {
  const globalStore = useGlobalStore();
  globalStore.setLoading(true);
  try {
    const res = await axios.get<IDepartment[]>(`${baseUrl}/admin/departments`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        ...defHeader,
      },
    });
    globalStore.departments = res.data;
    globalStore.setLoading(false);
  } catch (err) {
    globalStore.setLoading(false);
    globalStore.dangerAlert = true;
    globalStore.dangerAlertText = "Ошибка сервера";
    setTimeout(() => {
      globalStore.dangerAlert = false;
      globalStore.dangerAlertText = "";
    }, 3500);
    console.error(err);
  }
};

export const getRoles = async () => {
  const globalStore = useGlobalStore();
  globalStore.setLoading(true);
  try {
    const res = await axios.get<IRole[]>(`${baseUrl}/admin/employees/roles`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        ...defHeader,
      },
    });
    globalStore.roles = res.data;
    globalStore.setLoading(false);
  } catch (err) {
    globalStore.setLoading(false);
    globalStore.dangerAlert = true;
    globalStore.dangerAlertText = "Ошибка сервера";
    setTimeout(() => {
      globalStore.dangerAlert = false;
      globalStore.dangerAlertText = "";
    }, 3500);
    console.error(err);
  }
};
