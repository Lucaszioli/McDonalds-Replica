"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  const router = useRouter();
  const start = () => {
    router.push("fsw-donalds");
  };
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex flex-auto flex-col items-center">
        <h1 className="text-center text-4xl font-bold">
          Escolha um restaurante
        </h1>
        <h4 className="text-[3px] text-muted-foreground">
          {"(você não tem escolha )"}
        </h4>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <Button onClick={start} variant="destructive" className="rounded-full">
          FSW-Donalds
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
