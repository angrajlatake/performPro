import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, eachDayOfInterval } from 'date-fns';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateColumns = (startDate, endDate) => {
  console.log(startDate, endDate);
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  const columns =[
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  ]
  const columns2 = dates.map((date) => ({
    Header: format(date, 'yyyy-MM-dd'),
    accessor: format(date, 'yyyy-MM-dd'),
  }));
  return [...columns, ...columns2];
};