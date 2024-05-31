export interface IRole {
  id: number;
  name: string;
}

export interface IPermission {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  name: string;
  last_name: string | null;
  username: string;
  employee_number: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  roles: IRole[];
  permissions: IPermission[];
}

export interface IPosition {
  id: number;
  name: string;
  department_id: number;
}

export interface ISetting {
  id: number;
  roll_call_end_time: string;
  work_leave_enabled: boolean;
  roll_call_distance: number;
  organization_id: number;
  roll_call_start_time: string;
}

export interface IOrganization {
  name: string;
  legal_name: string;
  legal_name_prefix: string;
  location_lat: number;
  location_lng: number;
  id: number;
  created_at: string;
  updated_at: string;
  departments: null;
  settings: ISetting | null;
}

export interface ISchedule {
  day: string;
  is_work_day: boolean;
  work_start_time: string;
  work_end_time: string;
  roll_call_start_time: string;
  roll_call_end_time: string;
}

export interface IDepartment {
  id: number;
  name: string;
  organization: IOrganization;
  schedule: ISchedule[] | null;
  created_at: string;
  updated_at: string;
}

export interface ICreatedBy {
  id: number;
  name: string;
  last_name: string;
  username: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  roles: IRole[];
  permissions: IPermission[];
}

export interface IEmployee {
  id: number;
  phone: string;
  user: IUser;
  department: IDepartment;
  position: IPosition;
  created_by: ICreatedBy;
  created_at: string;
  updated_at: string;
}

export interface IEmployeeResponse {
  count: number;
  data: IEmployee[];
}

export interface IEmployeeData {
  name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  position_id: number;
  phone: string;
  department_id: number;
  organization_id: number | null;
  role_id: number;
}

export interface ICurrentUser {
  id: number;
  employee_number: string;
  is_active: boolean;
  created_at: string;
  name: string;
  last_name: string | null;
  password: string;
  firebase_notification_token: string;
  updated_at: string;
  roles: IRole[];
}

export interface ICurrentEmployee {
  id: number;
  organization_id: number;
  created_by_id: number;
  created_at: string;
  phone: string;
  user_id: number;
  department_id: number;
  position_id: number | null;
  updated_at: string;
  organization: IOrganization;
  department: IDepartment;
  position: IPosition | null;
  user: ICurrentUser;
}
