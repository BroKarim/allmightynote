"use client";

import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const lettersAndSymbols = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,";

interface AnimatedTextProps {
  className?: string;
  text: string;
}

export function ScrambleDemo() {
  return (
    <>
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 overflow-hidden z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 ">
          {/* Image Section */}
          <div className=" h-[400px] md:h-full flex  items-center">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" /> */}
            <img
              alt="by Matthew Osborn unsplash"
              className="w-full h-full object-cover object-center"
              src="https://images.unsplash.com/photo-1632850384791-99fda88d324b?q=80&w=2941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              // style={{
              //   objectFit: "cover",
              // }}
            />
          </div>

          {/* Content Section */}
          <div className="py-6 px-4 font-serif flex flex-col justify-between border-l border-zinc-700 space-y-6">
            <div className="space-y-4">
              <p className="text-zinc-500 font-mono">@gkinon</p>
              <ScrambleAnimation
                className="md:text-xl text-3xl font-bold tracking-wider text-white"
                text="GARY MAcKINON"
              />

              <p className="text-xl text-zinc-400 font-mono">* v£^s:e&</p>
            </div>

            <Button
              variant="outline"
              className="w-32 rounded-none bg-transparent font-medium  hover:bg-zinc-800 hover:text-white transition-all duration-300"
            >
              CONTACT
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
export function ScrambleAnimation({ text, className }: AnimatedTextProps) {
  const [animatedText, setAnimatedText] = useState("");

  const getRandomChar = useCallback(
    () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    [],
  );

  const animateText = useCallback(async () => {
    const duration = 50;
    const revealDuration = 80;
    const initialRandomDuration = 300;

    const generateRandomText = () =>
      text
        .split("")
        .map(() => getRandomChar())
        .join("");

    setAnimatedText(generateRandomText());

    const endTime = Date.now() + initialRandomDuration;
    while (Date.now() < endTime) {
      await new Promise(resolve => setTimeout(resolve, duration));
      setAnimatedText(generateRandomText());
    }

    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, revealDuration));
      setAnimatedText(
        prevText =>
          text.slice(0, i + 1) +
          prevText
            .slice(i + 1)
            .split("")
            .map(() => getRandomChar())
            .join(""),
      );
    }
  }, [text, getRandomChar]);

  useEffect(() => {
    animateText();
  }, [text, animateText]);

  return <div className={cn("relative inline-block", className)}>{animatedText}</div>;
}
