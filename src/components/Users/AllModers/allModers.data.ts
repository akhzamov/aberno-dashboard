import { baseUrl, defHeader } from "@/api";
import axios from "axios";
import type { IEmployeeResponse } from "@/Interfaces/user.interface";

export const fetchModers = async (
  page: number,
  perPage: number
): Promise<IEmployeeResponse> => {
  try {
    const res = await axios.get<IEmployeeResponse>(
      `${baseUrl}/admin/employees/admins`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          ...defHeader,
        },
        params: {
          page: page,
          per_page: perPage,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};
