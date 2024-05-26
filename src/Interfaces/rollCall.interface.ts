import type { IEmployee } from "./user.interface";

export interface ILeaveWork {
  leave_time: string;
  leave_note: string | null;
  leave_with_location: boolean;
}

export interface IWorkStatus {
  id: number;
  status: string;
  note: string | null;
  location: string | null;
  sick_leave: string | null;
  leave_work: ILeaveWork | null;
  employee: IEmployee;
  created_at: string;
  updated_at: string;
}

export interface IWorkStatusResponse {
  count: number;
  data: IWorkStatus[];
}

export interface IWorkDay {
  status: string | null;
  note: string | null;
  "on-work": string | null;
  "leave-work": string | null;
  "work-duration": string | null;
}

export interface IWorkDayResponse {
  [date: string]: IWorkDay;
}
