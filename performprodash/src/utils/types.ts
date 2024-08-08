export type ScheduleStatus = {
    status: string;
}

export type Schedule = {
  id: number;
  shift_start_time: string;
  shift_end_time: string;
  break_1_start_time: string;
  break_1_end_time: string;
  lunch_start_time: string;
  lunch_end_time: string;
  break_2_start_time: string;
  break_2_end_time: string;
  date: Date;
  schedule_status: ScheduleStatus
};
export type Employee = {
  first_name: string;
  last_name: string;
  province: string;
  date_of_joining: string;
  email: string;
}

export type EmployeeSchedule = {
  id: string;
  first_name: string;
  last_name: string;
  schedules: Schedule[];
}

export type EventsByDate = {
  [key: string]: Schedule[];
}