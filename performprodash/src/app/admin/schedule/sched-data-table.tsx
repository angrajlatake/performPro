"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { generateColumns, SchduleData } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";

interface DataTableProps {
  data: SchduleData[];
  date: DateRange | null;
}

const DataTable: React.FC<DataTableProps> = ({ data, date }) => {
  const [columns, setColumns] = useState<ColumnDef<SchduleData, any>[]>([]);
  const [pinnedColumns, setPinnedColumns] = useState<
    Record<string, "left" | "right">
  >({
    name: "left",
  });

  useEffect(() => {
    const newColumns: ColumnDef<SchduleData, any>[] = generateColumns(
      date.from,
      date.to
    ).map((col) => ({
      ...col,
    }));
    setColumns(newColumns);
  }, [date]);

  const table = useReactTable({
    data,
    columns: useMemo(() => columns, [columns]),
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 400,
    },
  });

  return (
    <Table className="" style={{ width: table.getTotalSize() }}>
      {columns.length > 0 && (
        <>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="text-sm p-2"
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    <small className="nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </small>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-sm p-1"
                      style={{ width: cell.column.getSize() }}
                    >
                      <small>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </small>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </>
      )}
    </Table>
  );
};

export default DataTable;
