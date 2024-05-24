import axios from "axios";
import { baseUrl, defHeader } from "@/api";
import type { IEmployeeData, IEmployee } from "@/Interfaces/user.interface";
import { useGlobalStore } from "@/stores/global";

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
export const editEmployee = async (
  employeeData: IEmployeeData
): Promise<IEmployee> => {
  const globalStore = useGlobalStore();
  globalStore.setLoading(true);
  try {
    const response = await axios.post<IEmployee>(
      `${baseUrl}/admin/employees`,
      { ...employeeData },
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
