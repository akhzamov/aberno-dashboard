import { baseUrl, defHeader } from "@/api";
import axios from "axios";
import type { IEmployeeResponse } from "@/Interfaces/user.interface";
import { useGlobalStore } from "@/stores/global";

export const fetchModers = async (
  page: number,
  perPage: number
): Promise<IEmployeeResponse> => {
  const globalStore = useGlobalStore();
  try {
    const params: Record<string, any> = {
      page: page,
      per_page: perPage,
    };

    if (globalStore.searchModers.trim() !== "") {
      params.search = globalStore.searchModers;
    }
    const res = await axios.get<IEmployeeResponse>(
      `${baseUrl}/admin/employees/admins`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          ...defHeader,
        },
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};
