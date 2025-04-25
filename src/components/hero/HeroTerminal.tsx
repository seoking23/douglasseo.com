import React from "react";
import { TerminalSection } from "@/components/terminal-section";

export const HeroTerminal: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 min-h-[50px] text-muted-foreground">
      <TerminalSection />
    </div>
  );
};
