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
  positionID: number | null,
  filterDate: string,
  departmentID: number | null
): Promise<IWorkStatusResponse> => {
  const authStore = useAuthStore();
  try {
    const params: Record<string, any> = {
      page: page,
      per_page: perPage,
      organization_id: authStore.organizationID ?? "",
    };

    if (positionID !== null) {
      params.position_id = positionID;
    }

    if (filterDate.length > 0) {
      params.filter_date = filterDate;
    }

    if (departmentID !== null) {
      params.department_id = departmentID;
    }

    const res = await axios.get<IWorkStatusResponse>(
      `${baseUrl}/admin/roll-call`,
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
