import { PageTree } from "fumadocs-core/server";

import { docs, meta, notesDocs, notesMeta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";

/* NOTE :
 * The main configuration for separators and content sources is handled in `source.config.ts`.
 * This file defines where content is sourced from and how it's organized in the sidebar.
 * */
export const {
  getPage,
  getPages,
  pageTree: originalTree,
} = loader({ source: createMDXSource(docs, meta) });

// export const {
//   getPage,
//   getPages,
//   pageTree: notesLoader,
// } = loader({ source: createMDXSource(notesDocs, notesMeta) });

const notesLoader = loader({
  source: createMDXSource(notesDocs, notesMeta),
});

// Notes loader dengan exports yang diperlukan
// export const {
//   getPage: getNotesPage,
//   getPages: getNotesPages,
//   pageTree: notesTree
// } = loader({ source: createMDXSource(notesDocs, notesMeta) });

const offTopic = ["/showcase"];
export const pageTree: PageTree.Root = {
  name: "Docs",
  children: [
    { type: "page", name: "About this site", url: "/" },
    // { type: "separator", name: "Components" },
    { type: "page", name: "Showcase", url: "/showcase" },

    { type: "separator", name: "UI Collection" },
    ...originalTree.children.filter(node => node.type !== "page" || !offTopic.includes(node.url)),
    // .sort((a, b) => a.name.localeCompare(b.name)),

    // Notes Collection
    { type: "separator", name: "Notes Collection" },
    ...notesLoader.pageTree.children,
    // ...notesTree.children,
    // ...notesLoader.pageTree.children.filter(node => node.type !== "page"),
  ],
};
