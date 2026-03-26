import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Content")
        .id("siteContent")
        .child(S.document().schemaType("siteContent").documentId("siteContent")),
    ])
