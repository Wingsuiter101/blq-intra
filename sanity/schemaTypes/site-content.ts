import { defineArrayMember, defineField, defineType } from "sanity"

export const siteContentType = defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  initialValue: { version: 1 },
  fields: [
    defineField({ name: "version", type: "number", initialValue: 1, validation: (r) => r.required().min(1) }),
    defineField({ name: "strategicDirector", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "onCall",
      type: "object",
      fields: [
        defineField({ name: "protocolEyebrow", type: "string", validation: (r) => r.required() }),
        defineField({ name: "pageTitle", type: "string", validation: (r) => r.required() }),
        defineField({ name: "pageSubtitle", type: "text", rows: 3, validation: (r) => r.required() }),
        defineField({ name: "responseTime", type: "string", validation: (r) => r.required() }),
        defineField({ name: "crewSummary", type: "string", validation: (r) => r.required() }),
        defineField({ name: "weeklySectionTitle", type: "string", validation: (r) => r.required() }),
        defineField({ name: "weeklySectionSubtitle", type: "string", validation: (r) => r.required() }),
        defineField({ name: "rotaFootnote", type: "text", rows: 2, validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: "weeklyRota",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "weekLabel", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "weekStartIso",
              type: "string",
              description: "ISO date, Monday of week",
              validation: (r) => r.required(),
            }),
            defineField({ name: "pm", type: "string", validation: (r) => r.required() }),
            defineField({ name: "designer", type: "string", validation: (r) => r.required() }),
            defineField({ name: "strategicDirector", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "weekLabel", subtitle: "pm" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "teamDirectory",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "designation", type: "string", validation: (r) => r.required() }),
            defineField({ name: "email", type: "string", validation: (r) => r.required() }),
            defineField({ name: "note", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "name", subtitle: "designation" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "clientComms",
      type: "object",
      fields: [
        defineField({ name: "pageTitle", type: "string", validation: (r) => r.required() }),
        defineField({ name: "pageSubtitle", type: "text", rows: 3, validation: (r) => r.required() }),
        defineField({ name: "faqSectionTitle", type: "string", validation: (r) => r.required() }),
        defineField({ name: "faqSectionSubtitle", type: "text", rows: 2, validation: (r) => r.required() }),
        defineField({
          name: "templates",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({ name: "content", type: "text", rows: 10, validation: (r) => r.required() }),
                defineField({ name: "fullWidth", type: "boolean" }),
                defineField({ name: "dangerTag", type: "string" }),
                defineField({ name: "whenToUse", type: "text", rows: 4 }),
              ],
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
        defineField({
          name: "faq",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "question", type: "string", validation: (r) => r.required() }),
                defineField({ name: "answer", type: "text", rows: 5, validation: (r) => r.required() }),
              ],
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
      ],
      validation: (r) => r.required(),
    }),
  ],
})
