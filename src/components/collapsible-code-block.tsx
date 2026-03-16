'use client';

import * as React from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleCodeBlockProps {
  children: React.ReactNode;
  isExpandable: boolean;
}

export function CollapsibleCodeBlock({ children, isExpandable }: CollapsibleCodeBlockProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="flex flex-col w-full group">
      <div 
        className={cn(
          "overflow-hidden transition-[max-height] duration-500 ease-in-out relative",
          !open && isExpandable ? "max-h-[160px]" : "max-h-[1000px]"
        )}
      >
        <div className="rounded-md border border-border-primary bg-[#0d0d0d] overflow-hidden min-h-[100px]">
          {children}
        </div>
        
        {!open && isExpandable && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/90 to-transparent pointer-events-none" />
        )}
      </div>

      {isExpandable && (
        <div className="flex items-center mt-2">
          <Collapsible.Trigger className="flex items-center gap-1 font-mono text-[10px] text-text-tertiary hover:text-accent-green transition-colors uppercase tracking-tight outline-none focus-visible:ring-1 focus-visible:ring-accent-green rounded px-1">
            {open ? (
              <>
                <ChevronUp className="h-3 w-3" />
                $ collapse_code
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                $ view_full_code
              </>
            )}
          </Collapsible.Trigger>
        </div>
      )}
    </Collapsible.Root>
  );
}
