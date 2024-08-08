"use client";
import React, { use, useEffect } from "react";

import platformClient from "purecloud-platform-client-v2/dist/web-cjs/bundle";

import config from "./config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "react-day-picker";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { subDays } from "date-fns";

const routingApi = new platformClient.RoutingApi();
const analyticsApi = new platformClient.AnalyticsApi();
const notificationsApi = new platformClient.NotificationsApi();
let userStatusWebsocket: WebSocket;

const WFM = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [queues, setQueues] = React.useState(null);
  const [logs, setLogs] = React.useState(null);
  useEffect(() => {
    const genesysLogin = async () => {
      const client = platformClient.ApiClient.instance;

      console.log("Logging in");
      client.setEnvironment(config.genesysCloud.region);
      client
        .loginImplicitGrant(config.clientId, config.redirectUri)
        .then((data) => {
          console.log(data);
          setLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    genesysLogin();
  }, []);

  useEffect(() => {
    const getRoutingData = async () => {
      if (loggedIn) {
        const response = await routingApi.getRoutingQueues();
        setQueues(response.entities);
      } else throw new Error("Not logged in");
    };
    const getPresenceData = async () => {
      if (loggedIn) {
        try {
          const query = {
            interval: `${subDays(
              new Date(),
              5
            ).toISOString()}/${new Date().toISOString()}`,
            order: "asc",
            paging: { pageNumber: 1, pageSize: 100 },
            segmentFilters: [],
            metrics: ["tPresence"],
          };

          const response = await analyticsApi.postAnalyticsUsersDetailsQuery(
            query
          );
          console.log(response.userDetails);
          return setLogs(response.userDetails);
        } catch (error) {
          console.error("Error retrieving presence logs:", error);
        }
      } else throw new Error("Not logged in");
    };
    getRoutingData();
    getPresenceData();
  }, [loggedIn]);

  // const subscribeToUsersStatus = async (
  //   userIds: string[],
  //   callbacks: ((message: MessageEvent) => void)[]
  // ) => {
  //   let channelId = "";
  //   const channel = await notificationsApi.getNotificationChannel();
  //   if (!channel.connectUri || !channel.id)
  //     throw new Error("Channel not created");
  //   console.log("Channel created");
  //   channelId = channel.id;
  //   if (userStatusWebsocket) userStatusWebsocket.close();
  //   userStatusWebsocket = new WebSocket(channel.connectUri);
  //   userStatusWebsocket.onmessage = (message) => {
  //     for (const cb of callbacks) {
  //       cb(message);
  //     }
  //   };

  //   // Subscribe to topics
  //   const topics: platformClient.Models.ChannelTopic[] = [];
  //   userIds.forEach((userId) => {
  //     topics.push({
  //       id: `v2.users.${userId}?presence&routingStatus`,
  //     });
  //   });

  //   await notificationsApi.postNotificationsChannelSubscriptions(
  //     channelId,
  //     topics
  //   );
  //   console.log("Subscribed to topics");
  // };

  // const getMembers = async (queueId: string) => {
  //   const data = await routingApi.getRoutingQueueMembers(queueId, {
  //     pageSize: 100,
  //     expand: ["presence", "routingStatus"],
  //   });
  //   console.log(data);
  //   return data.entities;
  // };
  // console.log(getMembers("259953c8-7188-4a0b-9375-20a027fcc5e9"));
  return (
    <div>
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Queues</CardTitle>
          </div>
          {/* <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden xl:table-column">Type</TableHead>
                <TableHead className="hidden xl:table-column">Status</TableHead>
                <TableHead className="hidden xl:table-column">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column">Sale</TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  2023-06-23
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              {queues &&
                queues?.map((queue) => (
                  <TableRow key={queue.id}>
                    <TableCell>
                      <div className="font-medium">{queue.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {queue.description}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      {queue.type}
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        {queue.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      {queue.date}
                    </TableCell>
                    <TableCell className="text-right">
                      {queue.joinedMemberCount}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Statuses</CardTitle>
          </div>
          {/* <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Time</TableHead>
                <TableHead className="">End Time</TableHead>
                <TableHead className="">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs &&
                logs[0]?.routingStatus?.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{log.startTime}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {log?.description}
                      </div>
                    </TableCell>
                    <TableCell className="">{log.endTime}</TableCell>
                    <TableCell className="">
                      <Badge className="text-xs" variant="outline">
                        {log.routingStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Primary Status</CardTitle>
          </div>
          {/* <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Time</TableHead>
                <TableHead className="">End Time</TableHead>
                <TableHead className="">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs &&
                logs[0]?.primaryPresence?.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{log.startTime}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {log?.description}
                      </div>
                    </TableCell>
                    <TableCell className="">{log.endTime}</TableCell>
                    <TableCell className="">
                      <Badge className="text-xs" variant="outline">
                        {log.systemPresence}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WFM;
