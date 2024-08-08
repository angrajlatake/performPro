import CalendarView from "@/components/calendarView";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { EmployeeSchedule, Schedule } from "@/utils/types";
import { endOfMonth, format, startOfMonth } from "date-fns";
import React, { use, useEffect, useMemo, useState } from "react";

const ScheduleTab = ({ id }: { id: string }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date("2024-06-06"));
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:8000/api/filter-employee-schedule/?employee_id=${id}&from_date=${format(
          startOfMonth(currentMonth),
          "yyyy-MM-dd"
        )}&to_date=${format(endOfMonth(currentMonth), "yyyy-MM-dd")}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log("error fetching data");
      }
      const data = await response.json();
      console.log(data[0].schedules);
      setScheduleData(data[0].schedules);
    };
    getData();
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    return scheduleData?.reduce(
      (acc: { [key: string]: Schedule[] }, event: Schedule) => {
        const date = format(event.date, "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(event);
        return acc;
      },
      {}
    );
  }, [scheduleData]);

  useEffect(() => {
    console.log(scheduleData);
    console.log(eventsByDate);
  }, [eventsByDate, scheduleData]);

  return (
    <TabsContent value="schedule" className="space-y-4 ">
      <CalendarView
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        eventsByDate={eventsByDate}
      />
    </TabsContent>
  );
};

export default ScheduleTab;
