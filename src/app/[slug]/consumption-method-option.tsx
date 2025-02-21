import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
interface ConsumptionMethodOptionProps {
  imageURL: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

const ConsumptionMehtodOption = ({
  imageAlt,
  imageURL,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card>
      <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
        <CardContent className="flex flex-col items-center gap-8 py-8">
          <div className="relative h-[80px] w-[80px]">
            <Image
              src={imageURL}
              fill
              alt={imageAlt}
              className="object-contain"
            ></Image>
          </div>
          <Button variant="secondary" className="rounded-full">
            {buttonText}
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ConsumptionMehtodOption;
