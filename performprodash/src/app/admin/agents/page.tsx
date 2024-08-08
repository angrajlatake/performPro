"use client";
import React from "react";
import { Employees, columns } from "./columns";
import { DataTable } from "./data-table";
async function getData(): Promise<Employees[]> {
  const response = await fetch("http://localhost:8000/api/employees/", {
    credentials: "include",
  });
  if (!response.ok) {
    console.log("error fetching data");
  }
  const data = await response.json();

  return data;
}

export default function DemoPage() {
  const [data, setData] = React.useState<Employees[]>([]);
  React.useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="p-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
