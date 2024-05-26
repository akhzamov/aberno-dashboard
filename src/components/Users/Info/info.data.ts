import { baseUrl, defHeader } from "@/api";
import axios from "axios";
import type {
  IWorkDayResponse,
  IWorkStatus,
} from "@/Interfaces/rollCall.interface";
import { useGlobalStore } from "@/stores/global";

export const fetchRollCalls = async (
  year: string,
  month: string,
  id: number
): Promise<IWorkDayResponse> => {
  const globalStore = useGlobalStore();
  globalStore.setLoading(true);
  try {
    const params: Record<string, any> = {};

    if (year != "" && month != "") {
      params.filter_date = `${year}-${month}-01`;
    }

    const res = await axios.get<IWorkDayResponse>(
      `${baseUrl}/admin/employees/${id}/roll-call-history`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          ...defHeader,
        },
        params,
      }
    );
    globalStore.setLoading(false);
    return res.data;
  } catch (error) {
    globalStore.setLoading(false);
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};
