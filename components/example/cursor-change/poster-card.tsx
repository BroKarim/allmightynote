import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function PosterCard() {
  return (
    <Card className=" w-full max-w-md p-0 rounded-none border-none bg-[#d7d8db] text-black">
      <CardContent className="px-2  ">
        <img
          src="https://images.unsplash.com/photo-1613206484186-6b8dc0605c86?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="by Dmitriy Demidov on Unsplash"
          className="object-cover pt-2 m-0"
        />

        <div className="font-mono text-red-500 tracking-wider mb-16">TDKs.90</div>
      </CardContent>
      <CardFooter className="flex gap-4 text-[8px] justify-between items-end px-6 pb-6 ">
        <div className="space-y-1 uppercase">
          <p>www.tdks90.com</p>
        </div>
        <div className="uppercase">
          <p>born in</p>
          <p>L.A</p>
        </div>
        <div className="space-y-1 uppercase flex flex-col">
          <p>rumours</p>
          <p>The Bodyguard </p>
          <p>brothers in arm</p>
          <p>thrillers</p>
          <p>Greatest Hits 1971-1975</p>
          <div>
            <p className="inline-block border mt-4 border-black  px-2 py-1 rounded-full text-[10px]">
              available
            </p>
          </div>
        </div>
        <div className="space-y-1 text-right">
          <p className="mt-2">2002</p>
        </div>
      </CardFooter>
    </Card>
  );
}
