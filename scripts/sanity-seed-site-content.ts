import { writeFileSync } from "fs"
import { join } from "path"
import { DEFAULT_SITE_CONTENT } from "../src/lib/site-defaults"

const payload = {
  _id: "siteContent",
  _type: "siteContent",
  ...DEFAULT_SITE_CONTENT,
}

const out = join(process.cwd(), "scripts", "site-content.seed.json")
writeFileSync(out, JSON.stringify(payload, null, 2), "utf-8")
console.log("Wrote", out)
console.log("Import with: sanity dataset import scripts/site-content.seed.json <dataset> --replace")
