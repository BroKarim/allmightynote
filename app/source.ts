import { PageTree } from "fumadocs-core/server";

import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";

export const {
  getPage,
  getPages,
  pageTree: originalTree,
} = loader({ source: createMDXSource(docs, meta) });

const offTopic = ["/showcase"];
export const pageTree: PageTree.Root = {
  name: "Docs",
  children: [
    { type: "page", name: "About this site", url: "/" },
    // { type: "separator", name: "Components" },
    { type: "page", name: "Showcase", url: "/showcase" },

    { type: "separator", name: "Content" },
    ...originalTree.children.filter(node => node.type !== "page" || !offTopic.includes(node.url)),
    // .sort((a, b) => a.name.localeCompare(b.name)),
  ],
};
