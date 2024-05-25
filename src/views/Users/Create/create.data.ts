import axios from "axios";
import { baseUrl, defHeader } from "@/api";
import type { IEmployeeData, IEmployee } from "@/Interfaces/user.interface";

export const createEmployee = async (
  employeeData: IEmployeeData
): Promise<IEmployee> => {
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
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};
