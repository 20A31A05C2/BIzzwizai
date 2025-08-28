import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-bizzwiz-glass-bg border border-bizzwiz-electric-cyan/20 rounded-md shadow-xl shadow-bizzwiz-nebula-purple/30", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center text-bizzwiz-star-white",
        caption_label: "text-sm font-orbitron font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-75 hover:opacity-100 border-bizzwiz-electric-cyan/30 hover:bg-bizzwiz-electric-cyan/10 text-bizzwiz-star-white hover:text-bizzwiz-electric-cyan"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-bizzwiz-comet-tail rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-bizzwiz-electric-cyan/15 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 text-bizzwiz-star-white",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-bizzwiz-electric-cyan/20 hover:text-bizzwiz-electric-cyan"
        ),
        day_selected:
          "bg-bizzwiz-electric-cyan text-bizzwiz-deep-space hover:bg-bizzwiz-electric-cyan hover:text-bizzwiz-deep-space focus:bg-bizzwiz-electric-cyan focus:text-bizzwiz-deep-space rounded-md shadow-md shadow-bizzwiz-electric-cyan/50",
        day_today: "bg-bizzwiz-magenta-flare/20 text-bizzwiz-magenta-flare rounded-md",
        day_outside: "text-bizzwiz-comet-tail/50 opacity-50",
        day_disabled: "text-bizzwiz-comet-tail/40 opacity-50",
        day_range_middle:
          "aria-selected:bg-bizzwiz-electric-cyan/15 aria-selected:text-bizzwiz-star-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props} />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };