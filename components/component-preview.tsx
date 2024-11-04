"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

import { useConfig } from "@/lib/use-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentWrapper from "./component-wrapper";
import { Icons } from "@/components/icons";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  Component: React.ComponentType; // Any component passed here can be rendered
  align?: "center" | "start" | "end";
  preview?: boolean;
}

export function ComponentPreview({
  Component,
  children,
  className,
  align = "center",
  preview = false,
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const [config] = useConfig();

  return (
    <div
      className={cn("relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        {!preview && (
          <div className="flex items-center justify-between pb-3">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
            </TabsList>
          </div>
        )}
        <TabsContent value="preview" className="relative rounded-md" key={key}>
          <ComponentWrapper>
            <Button
              onClick={() => setKey(prev => prev + 1)}
              className="absolute right-1.5 top-1.5 z-10 ml-4 flex items-center rounded-lg px-3 py-1"
              variant="ghost"
            >
              <RotateCcw aria-label="restart-btn" size={16} />
            </Button>
            <React.Suspense
              fallback={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              <Component />
            </React.Suspense>
          </ComponentWrapper>
        </TabsContent>
        </Tabs>
    </div>
  );
}
