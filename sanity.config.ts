import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"

export default defineConfig({
  name: "default",
  title: "BLQ Intra CMS",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4kmwddz5",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
