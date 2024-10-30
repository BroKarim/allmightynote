import { Metadata } from "next";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import Link from "next/link";
import Image from "next/image";
import { NotVercel } from "@/components/not-vercel";
import image from "./opengraph-image.png";

const REPO = "https://github.com/joulev/nextjs-faq";

export default function Home() {
  return (
    <DocsPage
      tableOfContent={{
        header: (
          <div className="flex flex-col gap-6 mb-6">
            <NotVercel />
          </div>
        ),
      }}
    >
      <DocsBody>
        <Image src={image} alt="Site banner" />
        <p>
          Welcome to Allmightynote—a UI component collection. I’m{" "}
          <Link href="https://x.com/BroKariim">@BroKariim</Link> , your friendly neighborhood code
          bro!
        </p>
        <p>
          This website is a culmination of my journey as a web developer, serving as a centralized
          resource to share the UI components I've built and the valuable lessons I've learned along
          the way.
        </p>
        <p>
          As a passionate designer and coder, I've dedicated countless hours to crafting a diverse
          collection of high-quality, customizable UI components. From sleek buttons and intuitive
          forms to dynamic data visualizations, each component has been meticulously designed and
          thoroughly tested to ensure a seamless user experience.
        </p>
        <p>
          But this website is more than just a showcase of my work—
          <strong>
            it’s a heartfelt thank you to all the open-source projects out there, from which I’ve
            learned so much
          </strong>
          . Feel free to explore the UI components, dive into the insightful notes, and make use of
          anything here to enhance your own websites and applications. This is for all of us, so
          let’s keep building and learning together
        </p>
        <p>
          Crafted with ❤️ and gratitude <br />— BroKarim
        </p>
      </DocsBody>
    </DocsPage>
  );
}

export const metadata: Metadata = {
  title: "All mighty note",
};
