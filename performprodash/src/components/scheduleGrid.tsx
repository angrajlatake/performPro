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
type Props = {
  noOfDays: number;
  date: DateRange;
};

const ScheduleGrid = ({ noOfDays, date }: Props) => {
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
        {Array.from({ length: 100 }, (_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">Agent {i + 1}</TableCell>
            {Array.from({ length: noOfDays }, (_, j) => (
              <TableCell key={j} className="text-center">
                {j + 1}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleGrid;
