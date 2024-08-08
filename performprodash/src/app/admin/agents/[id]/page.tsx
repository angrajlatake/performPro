"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee } from "@/utils/types";
import ScheduleTab from "./components/ScheduleTab";

async function getData({
  params,
}: {
  params: { id: string };
}): Promise<Employee[]> {
  const response = await fetch(
    `http://localhost:8000/api/employees/${params.id}/`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    console.log("error fetching data");
  }
  const data = await response.json();

  return data;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData({ params });
      setEmployeeData(data);
    };
    fetchData();
  }, [params]);

  return (
    <Tabs defaultValue="schedule" className="space-y-4 m-1">
      <div className="flex justify-between items-center px-4 py-1">
        {employeeData && (
          <h3 className="text-lg font-bold text-center">
            {employeeData?.first_name} {employeeData?.last_name}
          </h3>
        )}
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
          <TabsTrigger value="loggedhours">Logged Hours</TabsTrigger>
          <TabsTrigger value="leaves">Leaves</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>
      </div>
      <ScheduleTab id={params.id} />
    </Tabs>
  );
};

export default Page;
