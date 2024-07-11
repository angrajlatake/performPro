"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CalendarDateRangePicker } from "@/components/dateRangePicker";
import ScheduleGrid from "@/components/scheduleGrid";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export default function Component() {
  const [noOfDays, setNoOfDays] = useState(20);
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

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
      <div className=" overflow-x-auto">
        <ScheduleGrid noOfDays={noOfDays} date={date} />
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
