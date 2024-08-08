"use client";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { EventsByDate } from "@/utils/types";
import { Badge } from "./ui/badge";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type Props = {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  eventsByDate: EventsByDate;
};

const CalendarView = ({
  currentMonth,
  setCurrentMonth,
  eventsByDate,
}: Props) => {
  const firstDayOfMonth = useMemo(
    () => startOfMonth(currentMonth),
    [currentMonth]
  );
  const lastDayOfMonth = useMemo(
    () => endOfMonth(currentMonth),
    [currentMonth]
  );
  const dayInMonth = useMemo(
    () => eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth }),
    [firstDayOfMonth, lastDayOfMonth]
  );
  const startingDayIndex = useMemo(
    () => getDay(firstDayOfMonth),
    [firstDayOfMonth]
  );

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  return (
    <div className="container mx-auto mt-2">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <ChevronLeftIcon className="w-4 h-4" onClick={handlePrevMonth} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
          <h4 className="text-lg font-bold text-center">
            {format(currentMonth, "MMMM yyyy")}
          </h4>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
        </div>
      </div>
      <div className="h-full">
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((day, index) => (
            <Card key={index} className="text-center">
              {day}
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 flex-1 h-[75vh]">
          {Array.from({ length: startingDayIndex }, (_, i) => (
            <Card key={i} className="text-center"></Card>
          ))}
          {dayInMonth.map((day, index) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const todaysEvent = eventsByDate[dateKey];
            return (
              <Card
                key={index}
                className={`text-center ${
                  isToday(day) && "bg-accent text-white"
                }`}
              >
                <span className="m-2">{format(day, "d")}</span>
                <div className="flex items-center justify-center">
                  {todaysEvent?.map((event, i) => {
                    if (event?.schedule_status?.status === "Scheduled") {
                      return (
                        <div
                          key={`${dateKey}-${i}`}
                          className="flex items-center justify-center w-full"
                        >
                          <Badge
                            variant="outline"
                            className=" mx-2 w-full text-center"
                          >
                            Shift: {event.shift_start_time} -{" "}
                            {event.shift_end_time}
                          </Badge>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={`${dateKey}-${i}`}
                        className="flex items-center justify-center w-full"
                      >
                        <Badge variant={"secondary"} className=" mx-2 w-full">
                          {event?.schedule_status?.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
