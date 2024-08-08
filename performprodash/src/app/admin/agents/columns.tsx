"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employees = {
  first_name: string;
  last_name: string;
  province: string;
  date_of_joining: string;
  email: string;
};

export const columns: ColumnDef<Employees>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "province.abbreviation",
    header: "Province",
  },
  {
    accessorKey: "date_of_joining",
    header: "Date of Joining",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
