import { mkdirSync, writeFileSync } from "fs"
import { dirname, join } from "path"
import { DEFAULT_SITE_CONTENT } from "../src/lib/site-defaults"

const out = join(process.cwd(), "src", "content", "site.json")
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(DEFAULT_SITE_CONTENT, null, 2), "utf-8")
console.log("Wrote", out)
