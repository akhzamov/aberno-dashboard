import axios from "axios";
import { baseUrl, defHeader } from "@/api";
import type { IEmployee } from "@/Interfaces/user.interface";
import { useGlobalStore } from "@/stores/global";
import router from "@/router";
import { useModalStore } from "@/stores/modals";

export const getEmployeeByID = async (id: number): Promise<IEmployee> => {
  const globalStore = useGlobalStore();
  globalStore.setLoading(true);
  try {
    const response = await axios.get<IEmployee>(
      `${baseUrl}/admin/employees/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          ...defHeader,
        },
      }
    );
    globalStore.setLoading(false);
    return response.data;
  } catch (error) {
    globalStore.setLoading(false);
    console.error("Error creating employee:", error);
    throw error;
  }
};
export const deactivateEmployeeByID = async (id: number): Promise<any> => {
  const globalStore = useGlobalStore();
  const modalStore = useModalStore();
  globalStore.setLoading(true);
  try {
    const response = await axios.delete<any>(
      `${baseUrl}/admin/employees/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          ...defHeader,
        },
      }
    );
    router.push("/users");
    modalStore.successModal = true;
    modalStore.successModalText = "Учетная запись пользователя удалена!";
    globalStore.setLoading(false);
    return response.data;
  } catch (error) {
    globalStore.setLoading(false);
    console.error("Error creating employee:", error);
    throw error;
  }
};
export const reactivateEmployeeByID = async (id: number): Promise<any> => {
  const globalStore = useGlobalStore();
  const modalStore = useModalStore();
  globalStore.setLoading(true);
  try {
    const response = await axios.put<any>(
      `${baseUrl}/admin/employees/${id}/reactivate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          ...defHeader,
        },
      }
    );
    modalStore.successModal = true;
    modalStore.successModalText = "Учетная запись пользователя восстановлена!";
    router.push("/users");
    globalStore.setLoading(false);
    return response.data;
  } catch (error) {
    globalStore.setLoading(false);
    console.error("Error creating employee:", error);
    throw error;
  }
};
