"use client";

import React, { useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { fetchGitHubUser } from "@/app/api/github-data/route";
import type { GitHubUser } from "@/app/type/types";

interface PopoverExampleProps {
  username: string;
}

export function PopoverDemo() {
  return (
    <>
      <div className="z-10">
        <PopoverExample username="BroKarim" />
      </div>
    </>
  );
}
export function PopoverExample({ username }: PopoverExampleProps) {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/github-data?username=${username}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (isMounted) {
          setUserData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading user data:", err);
          setError(err instanceof Error ? err.message : "Failed to load user data");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUserData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [username]);

  if (isLoading) {
    return <div className="animate-pulse rounded-full bg-gray-200 w-[45px] h-[45px]" />;
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error loading profile</div>;
  }

  if (!userData) {
    return null;
  }
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          <div className="rounded-full">
            <img
              className="rounded-full"
              src={userData?.avatar_url}
              alt={userData.name}
              width={60}
              height={60}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={15} className="border-none ">
          <AnimatePresence>
            <motion.div
              className="z-10 w-full max-w-[300px] rounded-lg border dark:border-neutral-800 dark:bg-neutral-950 p-5"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 19,
                mass: 1.2,
              }}
            >
              <motion.div
                variants={container}
                initial="initial"
                animate="animate"
                exit="initial"
                className="flex flex-col gap-2"
              >
                <motion.div variants={item}>
                  <img
                    className="rounded-full"
                    src={userData?.avatar_url}
                    alt={userData.name}
                    width={60}
                    height={60}
                  />
                </motion.div>
                <div className="flex flex-col gap-4">
                  <div>
                    <motion.h1
                      variants={item}
                      className="text-base font-medium text-black dark:text-white"
                    >
                      {userData.name}
                    </motion.h1>
                    <motion.p variants={item} className="text-base dark:text-neutral-400">
                      @{userData?.login}
                    </motion.p>
                  </div>
                  <motion.span variants={item} className="text-base dark:text-neutral-200">
                    {userData?.bio || "No bio available"}
                  </motion.span>
                  <motion.div variants={item} className="flex gap-4">
                    <div className="flex gap-1.5 dark:text-neutral-300">
                      <span className="text-base font-medium ">{userData?.following}</span>{" "}
                      <span className="text-base ">Following</span>
                    </div>
                    <div className="flex gap-1.5 dark:text-neutral-300">
                      <span className="text-base font-medium">{userData?.followers}</span>{" "}
                      <span className="text-base ">Followers</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const container = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const item = {
  initial: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 19,
      mass: 1.2,
    },
  },
};
