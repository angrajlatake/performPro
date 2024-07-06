"use client";

import Link from "next/link";
import { LogOut, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import useLogout from "@/hooks/useLogout";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant?: "default" | "ghost" | "outline";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();
  const { handleLogout } = useLogout();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-10 w-10",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.variant, size: "default" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-5 w-5" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={isCollapsed ? "icon" : "default"}
              onClick={handleLogout}
              className={`${!isCollapsed && "justify-start"}`}
            >
              <LogOut className={`h-5 w-5 ${!isCollapsed && "mr-2"}`} />
              {isCollapsed ? "" : "Logout"}
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" className="flex items-center gap-4">
              Logout
            </TooltipContent>
          )}
        </Tooltip>
      </nav>
    </div>
  );
}
