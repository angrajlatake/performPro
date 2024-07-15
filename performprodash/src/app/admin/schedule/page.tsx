"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/dateRangePicker";
import ScheduleGrid from "@/components/scheduleGrid";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import DataTable from "./sched-data-table";
import { SchduleData } from "./columns";

export default function Component() {
  const [noOfDays, setNoOfDays] = useState(20);
  const [date, setDate] = React.useState<DateRange>({
    from: new Date("2024-06-01"),
    // to: addDays(new Date(), 20),
    to: new Date("2024-06-30"),
  });
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    const getSchedules = async () => {
      if (!date) return;
      const response = await fetch(
        `http://localhost:8000/api/filter-schedules/?from_date=${format(
          date?.from,
          "yyyy-MM-dd"
        )}&to_date=${format(date?.to, "yyyy-MM-dd")}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log("error fetching data");
      }
      const data = await response.json();
      console.log(data);
      setScheduleData(data);
    };
    getSchedules();
  }, [date]);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-background border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CalendarDateRangePicker
            setNoOfDays={setNoOfDays}
            date={date}
            setDate={setDate}
          />
          <h1 className="text-xl font-semibold">Team Scheduler</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Schedule Event
          </Button>
        </div>
      </header>
      <div className="overflow-x-auto text-sm">
        {/* {scheduleData && (
          <ScheduleGrid
            noOfDays={noOfDays}
            date={date}
            scheduleData={scheduleData}
          />
        )} */}

        {scheduleData && <DataTable data={scheduleData} date={date} />}
      </div>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
