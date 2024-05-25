import { baseUrl, defHeader } from "@/api";
import axios from "axios";
import type {
  IWorkStatusResponse,
  IWorkStatus,
} from "@/Interfaces/rollCall.interface";
import { useAuthStore } from "@/stores/auth";

export const fetchRollCalls = async (
  page: number,
  perPage: number,
  filterDate: string,
  id: number
): Promise<IWorkStatusResponse> => {
  const authStore = useAuthStore();
  try {
    const params: Record<string, any> = {
      page: page,
      per_page: perPage,
    };

    if (filterDate.length > 0) {
      params.filter_date = filterDate;
    }

    const res = await axios.get<IWorkStatusResponse>(
      `${baseUrl}/admin/employees/${id}/roll-call-history`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          ...defHeader,
        },
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};
