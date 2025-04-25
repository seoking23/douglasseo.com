import React from "react";

export const HeroTitle: React.FC = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
        Douglas Seo
      </h1>
      <p className="text-xl text-muted-foreground">
        Full-Stack Software Engineer & Founder
      </p>
    </div>
  );
};
