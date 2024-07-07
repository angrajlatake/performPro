"use client";
import { MainNav } from "@/components/mainNav";
import { Nav } from "@/components/nav";
import { Search } from "@/components/SearchUI";
import TeamSwitcher from "@/components/teamSwitcher";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserNav } from "@/components/userNav";
import { navOptions } from "@/lib/constants";
import { Triangle } from "lucide-react";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="flex h-screen w-full items-start">
      <TooltipProvider>
        <aside
          className={`left-0 z-20 flex h-full flex-col border-r ${
            isCollapsed ? "w-[60px]" : "w-[300px]"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="border-b">
            <div className="flex h-16 items-center p-1">
              <Button
                variant="ghost"
                size="default"
                aria-label="Home"
                onClick={toggleSidebar}
              >
                <Triangle className="size-5 fill-foreground" />
              </Button>
              {!isCollapsed && (
                <h1 className="text-xl font-semibold transition-all duration-300 ease-in-out">
                  PerformPro
                </h1>
              )}
            </div>
          </div>
          {/* <div className="border-b h-16 p-1 flex items-center gap-4"></div> */}
          <Nav isCollapsed={isCollapsed} links={navOptions} />
        </aside>
      </TooltipProvider>
      <div className="flex-1 h-screen">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
