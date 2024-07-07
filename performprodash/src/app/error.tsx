"use client";
import { useToast } from "@/components/ui/use-toast";

export default function Error() {
  const { toast } = useToast();
  return (
    <>
      {toast({
        title: "Error",
        description: "Something went wrong",
      })}
    </>
  );
}
