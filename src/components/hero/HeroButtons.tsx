import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HeroButtons: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Link href="#projects">
        <Button className="w-full sm:w-auto">View Projects</Button>
      </Link>
      <Link href="#contact">
        <Button variant="outline" className="w-full sm:w-auto">
          Contact Me
        </Button>
      </Link>
    </div>
  );
};
