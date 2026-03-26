import { AlertTriangle, Server, Mail, FileCheck2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { requireSiteAuth } from "@/lib/auth-guard"

export default async function ITOps() {
  await requireSiteAuth("/it-ops")

  return (
    <div className="max-w-5xl mx-auto space-y-24 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">IT & File Management</h1>
        <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide">
          Standard Operating Procedures for naming, storing, and communicating.
        </p>
      </div>

      <div className="grid gap-16 border-t border-white/10 pt-16">
        
        {/* Section 1: Naming Conventions */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <FileCheck2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-black tracking-tighter uppercase">The BLQ Naming Convention</h2>
          </div>
          <p className="text-white/60 font-light text-lg leading-relaxed">
            To keep our workflow seamless, every file created must follow this exact structure before being saved or shared:
          </p>
          
          <div className="p-6 border border-white/10 bg-white/5 font-mono text-sm space-y-8">
            {/* File Naming */}
            <div className="space-y-6">
              <div>
                <p className="text-primary font-bold tracking-widest uppercase mb-2">File Naming Formula:</p>
                <p className="text-white bg-black p-4 border border-white/10 overflow-x-auto">
                  [ClientName]_[Project/Campaign]_[AssetType]_[Date]_[Version]
                </p>
              </div>
              
              <div className="space-y-3 text-white/70">
                <p className="text-primary font-bold tracking-widest uppercase text-xs">Examples:</p>
                <p className="pl-4 border-l border-white/20">MyMart_AprilCampaign_SocialStatic_23Mar_v1.png</p>
                <p className="pl-4 border-l border-white/20">DGO_BrandBook_LogoExploration_23Mar_v3.ai</p>
                <p className="pl-4 border-l border-white/20">GazzabkoPiro_Taglines_Doc_23Mar_Final.pdf</p>
              </div>
              
              <div className="p-4 border-l-2 border-primary bg-primary/5 text-white/80">
                <strong className="text-primary uppercase tracking-widest text-xs block mb-1">The Golden Rule:</strong>
                Never use the word &quot;Final&quot; until the client has explicitly approved it in writing. Stick to v1, v2, etc., until then.
              </div>
            </div>

            <div className="h-px bg-white/10 w-full" />

            {/* Folder Structure */}
            <div className="space-y-6">
              <div>
                <p className="text-primary font-bold tracking-widest uppercase mb-2">Folder Structure (Max 3 Layers):</p>
                <p className="text-white/60 font-sans text-sm mb-4">
                  To prevent lost files and broken links, folder depth is strictly limited to 3 layers.
                </p>
                <div className="text-white bg-black p-4 border border-white/10 overflow-x-auto space-y-2">
                  <p className="text-primary">L1: [Client Name]</p>
                  <p className="pl-4 text-white/80">↳ L2: [Year]_[Month]_[Campaign/Project Name]</p>
                  <p className="pl-8 text-white/60">↳ L3: [Working Files] / [Exports] / [Assets]</p>
                </div>
                <p className="text-white/50 font-sans text-xs mt-2">
                  Use a 3-letter month (Jan, Feb, Mar …) so folders sort chronologically when listed alphabetically.
                </p>
              </div>
              
              <div className="space-y-3 text-white/70">
                <p className="text-primary font-bold tracking-widest uppercase text-xs">Example Structure:</p>
                <div className="pl-4 border-l border-white/20 space-y-1">
                  <p>📁 MyMart</p>
                  <p className="pl-4">📁 2026_Oct_DashainCampaign</p>
                  <p className="pl-8">📁 Working_Files <span className="text-white/40 italic">(PSDs, AEPs, PRPRJs)</span></p>
                  <p className="pl-8">📁 Exports <span className="text-white/40 italic">(MP4s, PNGs, PDFs)</span></p>
                  <p className="pl-8">📁 Assets <span className="text-white/40 italic">(Raw footage, fonts, logos)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: M365 & NAS */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Server className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-black tracking-tighter uppercase">Microsoft 365 & File Sharing Protocol</h2>
          </div>
          <p className="text-white/60 font-light text-lg leading-relaxed">
            We are fully operational on our new Microsoft 365 plan, which handles our emails, Teams communication, and light document sharing (Word, Excel, PowerPoint). However, we have a strict dual-system workflow:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/10 bg-white/5 space-y-4 hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold tracking-tight uppercase text-white">For Comms & Light Files</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Use Teams and OneDrive/SharePoint for quick sharing, collaborative drafting, and internal chats.
              </p>
              <div className="mt-4 p-4 border-l-2 border-primary bg-primary/5 text-white/80">
                <strong className="text-primary uppercase tracking-widest text-xs block mb-1">Mandatory Access Rule:</strong>
                Every folder created on OneDrive <strong>must</strong> be shared with your respective Head of Department (HOD). 
                <ul className="list-disc pl-4 mt-2 space-y-1 text-sm text-white/60">
                  <li><strong>HR Team:</strong> Share with HR Head</li>
                  <li><strong>Design & Content:</strong> Share with Creative Head & Strategic Director</li>
                  <li><strong>Accounts:</strong> Share with Account Director</li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Accordion className="w-full">
                  <AccordionItem value="onedrive-tutorial" className="border-white/10 border-b-0">
                    <AccordionTrigger className="text-sm font-bold tracking-widest uppercase text-primary hover:text-white transition-colors py-2">
                      How to use OneDrive Properly
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-white/60 space-y-3 pt-2 font-light">
                      <p><strong>1. Syncing to Desktop:</strong> Download the OneDrive app and sign in with your BLQ email. This creates a local folder that automatically syncs to the cloud.</p>
                      <p><strong>2. Sharing Folders:</strong> Right-click a folder &gt; Share &gt; Type your HOD&apos;s name &gt; Ensure &quot;Can Edit&quot; is selected &gt; Click Send.</p>
                      <p><strong>3. Status Icons:</strong></p>
                      <ul className="pl-4 space-y-1">
                        <li>☁️ <em>Cloud only:</em> File is online, takes up no space.</li>
                        <li>✅ <em>Green check:</em> File is downloaded and synced.</li>
                        <li>🔄 <em>Syncing:</em> Currently uploading/downloading.</li>
                      </ul>
                      <p><strong>4. Freeing up space:</strong> Right-click a heavy folder you don&apos;t need right now and select &quot;Free up space&quot; to push it back to cloud-only.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            <div className="p-8 border border-primary/30 bg-primary/5 space-y-4 hover:border-primary transition-colors">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold tracking-tight uppercase text-primary">For Heavy Assets & Backups</h3>
              </div>
              <p className="text-white/80 font-light leading-relaxed">
                Because cloud storage has failed us multiple times in the past, all heavy working files, video projects, and final assets must be saved and backed up to a designated <strong>external hard drive</strong>. <span className="text-primary italic">(Note: We will be deploying a centralized NAS server soon.)</span>
              </p>
              <p className="text-white font-medium">
                Do not leave massive design files sitting only on your local machine or solely on OneDrive. The external hard drive is our current single source of truth.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Email Etiquette */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Mail className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-black tracking-tighter uppercase">Email Etiquette (The &quot;Don&apos;ts&quot;)</h2>
          </div>
          <p className="text-white/60 font-light text-lg leading-relaxed">
            Strict rules regarding the use of the new BLQ Microsoft 365 email addresses to maintain security and professionalism:
          </p>
          
          <ul className="space-y-4 text-white/70 font-light text-lg list-none">
            <li className="flex items-start gap-4 p-4 border border-white/10 bg-white/5">
              <span className="text-primary font-black mt-1">01</span>
              <p><strong>Don&apos;t use BLQ emails for personal sign-ups.</strong> No Netflix, Spotify, or personal social media accounts. Keep it strictly professional.</p>
            </li>
            <li className="flex items-start gap-4 p-4 border border-white/10 bg-white/5">
              <span className="text-primary font-black mt-1">02</span>
              <p><strong>Don&apos;t alter the official signature.</strong> Do not add custom quotes, different fonts, or unauthorized logos to your email signature.</p>
            </li>
            <li className="flex items-start gap-4 p-4 border border-white/10 bg-white/5">
              <span className="text-primary font-black mt-1">03</span>
              <p><strong>Don&apos;t use &quot;Reply All&quot; blindly.</strong> Only include stakeholders who absolutely need to be in the loop to reduce inbox clutter.</p>
            </li>
            <li className="flex items-start gap-4 p-4 border border-white/10 bg-white/5">
              <span className="text-primary font-black mt-1">04</span>
              <p><strong>Don&apos;t send heavy attachments via email.</strong> Use OneDrive links or NAS server links for files larger than 10MB. Do not clog the mail server.</p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}
