"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import memoryDB from "./memory";

import { Star } from 'lucide-react';
import type { Words } from "@/lib/types/db";

function LearningPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setIsMeaning(false);
    });
  }, [api]);

  // // mouse click
  // const handlePrev = () => {
  //   api.scrollPrev();
  //   setCurrent(api.selectedScrollSnap() + 1)
  // }

  // const handleNext = () => {
  //   api.scrollNext();
  //   setCurrent(api.selectedScrollSnap() + 1)
  // }

  // on keyboard
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "ArrowUp") {
        console.log("KeyDown Up");
        setIsMeaning(false);
      } else if (event.key === "ArrowDown") {
        console.log("KeyDown Down");
        setIsMeaning(true);
      } else if (event.key === "ArrowLeft") {
        console.log("KeyDown Left");
        api.scrollPrev();
      } else if (event.key === "ArrowRight") {
        console.log("KeyDown Right");
        api.scrollNext();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [api]);

  const [isMeaning, setIsMeaning] = useState(false);

  const handleOnClick = (word: Words) => {
    // add some other things here
    console.log(word);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div>
        <Carousel
          setApi={setApi}
          className="w-full max-w-xs"
          opts={{
            loop: true,
            skipSnaps: true,
            keyboard: false,
          }}
        >
          <CarouselContent onKeyDown={() => {}}>
            {memoryDB.map((word) => (
              <CarouselItem
                key={word.id}
                onClick={() => {
                  setIsMeaning(!isMeaning);
                }}
              >
                <div className="p-2">
                  <Card className="border-slate-400 bg-gray-700">
                    <CardContent className="flex aspect-square justify-center p-6 font-normal text-slate-100 w-full">
                      {!isMeaning ? (
                        <div className="flex flex-col w-full">
                          <div className="flex-[1_1_0%] flex"> 
                            <div className="ml-auto">
                              <Star 
                                fill={word.star? "yellow" : "#334155"} 
                                strokeWidth={word.star? 0 : 1}
                                onClick={(event) => {  
                                  event.stopPropagation();
                                  handleOnClick(word);
                                  }}/> 
                            </div>
                          </div>
                          <p className="flex-[4_4_0%]"></p>
                          <p className="flex-[5_5_0%] text-4xl text-center">{word.content}</p>
                          <p className="flex-[3_3_0%] mt-auto text-sm text-slate-500 text-center">
                            Click or press ↓
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col w-full">
                          <div className="flex-[1_1_0%] flex"> 
                            <div className="ml-auto">
                            <Star 
                                fill={word.star? "yellow" : "#334155"} 
                                strokeWidth={word.star? 0 : 1}
                                onClick={() => handleOnClick(word)}/> 
                            </div>
                          </div>
                          <p className="flex-[4_4_0%]"></p>
                          <p className="flex-[5_5_0%] text-4xl text-center">{word.meaning}</p>
                          <p className="flex-[3_3_0%] mt-auto text-sm text-slate-500 text-center">
                            Click or press ↑
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-400" />
          <CarouselNext className="bg-gray-400" />
        </Carousel>
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} / {count}
      </div>
    </div>
  );
}

export default LearningPage;