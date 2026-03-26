import { ScriptBlock } from "@/components/script-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getSiteContent } from "@/lib/site-content"
import { requireSiteAuth } from "@/lib/auth-guard"

export default async function ClientComms() {
  await requireSiteAuth("/client-comms")
  const { clientComms } = await getSiteContent()

  return (
    <div className="mx-auto max-w-6xl space-y-24 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">{clientComms.pageTitle}</h1>
        <p className="text-xl font-light leading-relaxed tracking-wide text-white/50 md:text-2xl">
          {clientComms.pageSubtitle}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {clientComms.templates.map((template, index) => (
          <div key={index} className={template.fullWidth ? "lg:col-span-2" : ""}>
            <ScriptBlock
              title={template.title}
              content={template.content}
              dangerTag={template.dangerTag}
              whenToUse={template.whenToUse}
            />
          </div>
        ))}
      </div>

      <div className="space-y-8 border-t border-white/10 pt-16">
        <div className="space-y-2">
          <h2 className="text-3xl font-black uppercase tracking-tighter">{clientComms.faqSectionTitle}</h2>
          <p className="font-light leading-relaxed text-white/50">{clientComms.faqSectionSubtitle}</p>
        </div>

        <Accordion className="w-full">
          {clientComms.faq.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-white/10 py-4">
              <AccordionTrigger className="text-left text-xl font-bold tracking-tight transition-colors hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4 text-lg font-light text-white/60">
                <p className="text-sm font-bold uppercase tracking-widest text-primary">Suggested response:</p>
                <div className="border border-white/10 bg-white/5 p-6 font-mono text-sm leading-relaxed text-white/70">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
