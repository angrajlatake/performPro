"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, eachDayOfInterval } from "date-fns";
import { date } from "zod";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Schedule = {
  shift_start_time: string;
  shift_end_time: string;
  break_1_start_time: string;
  break_1_end_time: string;
  lunch_start_time: string;
  lunch_end_time: string;
  break_2_start_time: string;
  break_2_end_time: string;
  date: Date;
};

export type SchduleData = {
  first_name: string;
  last_name: string;
  schedules: Schedule[];
};

export const generateColumns = (startDate: Date, endDate: Date) => {
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  return [
    {
      accessorFn: (row: SchduleData) => `${row.first_name} ${row.last_name}`,
      header: "Name",
      size: 100,
    },
    ...dates.map((date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      return {
        size: 100,
        Header: formattedDate,
        accessorFn: (row: SchduleData) => {
          if (!row.schedules) return "Off";
          const schedule = row.schedules.find(
            (s) => format(s.date, "yyyy-MM-dd") === formattedDate
          );
          return schedule
            ? `${schedule?.shift_start_time} - ${schedule?.shift_end_time}`
            : "Off";
        },
        id: formattedDate, // Ensure each column has a unique ID
      };
    }),
  ];
};

export const columns: ColumnDef<SchduleData>[] = [
  {
    accessorFn: (row: SchduleData) => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
];
