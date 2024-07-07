import {  Blocks, CalendarDays, Clock, CreditCard, LucideIcon, TreePalm, TriangleAlert, Users, LogOut } from "lucide-react";

interface NavOption {
    title: string;
    icon: LucideIcon;
    href: string;
}

export const navOptions: NavOption[] = [
    {
        title: "Agents",
        icon: Users,
        href: "/admin/agents"
    },
    {
        title: "Schedule",
        icon: CalendarDays,
        href: "/admin/schedule"
    },
    {
        title: "Training",
        icon: Blocks,
        href: "/admin/training"
    },
    {
        title: "Exceptions",
        icon: TriangleAlert,
        href: "/admin/exceptions"
    },
    {
        title: "Logged Hours",
        icon: Clock,
        href: "/admin/loggedhours"
    },
    {
        title: "Leaves",
        icon: TreePalm,
        href: "/admin/leaves"
    },
    {
        title:"Payroll",
        icon: CreditCard,
        href: "/admin/payroll"
    },

]