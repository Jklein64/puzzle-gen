import generateIDs from "./puppet.js"
import fs from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { exec } from "child_process"

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
	const IDs = await generateIDs({
		quantity: 10,
		size: 9,
		difficulty: "Trivial",
	})
	console.log(IDs)
}
main()
