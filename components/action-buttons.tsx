"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DatePicker from "@/components/date-picker";
import { RiExpandRightLine } from "@remixicon/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Suspense } from "react";

export function ActionButtons() {
  const isMobile = useIsMobile();

  return (
    <div className="flex gap-3">
      <Suspense>
        <DatePicker />
      </Suspense>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="aspect-square max-lg:p-0">
              <RiExpandRightLine
                className="lg:-ms-1 opacity-40 size-5"
                size={20}
                aria-hidden="true"
              />
              <span className="max-lg:sr-only">Export</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="lg:hidden" hidden={isMobile}>
            Export
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
