import {  Blocks, CalendarDays, Clock, CreditCard, LucideIcon, TreePalm, TriangleAlert, Users } from "lucide-react";

interface NavOption {
    title: string;
    icon: LucideIcon;
    variant: "default" | "ghost" | "outline"; // make the variant explicitly typed
    href: string;
}

export const navOptions: NavOption[] = [
    {
        title: "Agents",
        icon: Users,
        variant: "ghost",
        href: "admin/agents"
    },
    {
        title: "Schedule",
        icon: CalendarDays,
        variant: "ghost",
        href: "admin/schedule"
    },
    {
        title: "Training",
        icon: Blocks,
        variant: "default",
        href: "admin/training"
    },
    {
        title: "Exceptions",
        icon: TriangleAlert,
        variant: "ghost",
        href: "admin/exceptions"
    },
    {
        title: "Logged Hours",
        icon: Clock,
        variant: "ghost",
        href: "admin/loggedhours"
    },
    {
        title: "Leaves",
        icon: TreePalm,
        variant: "ghost",
        href: "admin/leaves"
    },
    {
        title:"Payroll",
        icon: CreditCard,
        variant: "ghost",
        href: "admin/payroll"
    }
]