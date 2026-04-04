"use client";

import React from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";

export interface FixedSelectProps extends SelectPrimitive.SelectProps {
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function FixedSelect({
  placeholder,
  triggerClassName,
  contentClassName,
  children,
  ...props
}: FixedSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className={cn("w-full bg-transparent", triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      
      <SelectContent
        position="popper"
        sideOffset={6}
        className={cn("z-[9999] rounded-xl shadow-lg border border-border bg-popover", contentClassName)}
      >
        {children}
      </SelectContent>
    </Select>
  );
}

// Re-export other select pieces for easy imports
export { SelectItem, SelectGroup, SelectLabel, SelectSeparator } from "@/components/ui/select";
