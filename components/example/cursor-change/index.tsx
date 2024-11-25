'use client'

import { Cursor } from "./cursor";
import PosterCard from "./poster-card";
import { SVGProps } from "react";

export function CursorChange() {
  return (
    <>
      <div className="z-10 overflow-hidden ">
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.15,
          }}
          className="left-12 top-4"
        >
          <div>
            <Mouse className="h-6 w-6" />
            <div className="ml-4 mt-1 rounded-[4px] bg-gray-500 px-2 py-0.5 text-neutral-50">
              Audio Cassette
            </div>
          </div>
        </Cursor>
        <PosterCard />
      </div>
    </>
  );
}

const Mouse = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={26} height={31} {...props}>
      <g clipPath="url(#a)">
        <path
          fill={"#000"}
          fillRule="evenodd"
          stroke={"#fff"}
          strokeLinecap="square"
          strokeWidth={2}
          d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill={"#000"} d="M0 0h26v31H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
