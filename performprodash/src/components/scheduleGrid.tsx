import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import { SchduleData } from "@/app/admin/schedule/columns";
type Props = {
  noOfDays: number;
  date: DateRange;
  scheduleData: SchduleData[];
};

const ScheduleGrid = ({ noOfDays, date, scheduleData }: Props) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Agent</TableHead>
          {Array.from({ length: noOfDays }, (_, i) => (
            <TableHead
              key={i}
              className="bg-background px-3 py-2 font-medium text-sm text-center"
            >
              {new Date(
                date?.from.getFullYear(),
                date?.from.getMonth(),
                date?.from.getDate() + i
              ).toLocaleDateString("zh-CN")}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {Array.from({ length: 100 }, (_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">Agent {i + 1}</TableCell>
            {Array.from({ length: noOfDays }, (_, j) => (
              <TableCell key={j} className="text-center">
                {j + 1}
              </TableCell>
            ))}
          </TableRow>
        ))} */}
        {scheduleData &&
          scheduleData?.map((schedule, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {schedule.first_name}
              </TableCell>
              {Array.from({ length: noOfDays }, (_, j) => (
                <TableCell key={j} className="text-center">
                  {schedule.schedules[j]?.shift_start_time}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleGrid;
