import fs from "fs"
import Puppeteer from "puppeteer"

export function findGameID() {
	return document?.querySelector("#permalink-desc")?.getAttribute("href")?.substring(1)
}

export type Difficulty = "Trivial" | "Basic" | "Intermediate" | "Advanced" | "Extreme" | "Unreasonable"

function calculateDifficultyNumber(difficulty: Difficulty): number {
	return ["Trivial", "Basic", "Intermediate", "Advanced", "Extreme", "Unreasonable"].findIndex(v => difficulty === v)
}

export async function newGame(page: Puppeteer.Page, options: { size: number; difficulty: Difficulty }) {
	// width is always larger than height
	const subWidth = `${Math.ceil(Math.sqrt(options.size))}`
	const subHeight = `${Math.floor(Math.sqrt(options.size))}`

	await page.hover("#gamemenu > ul > li:nth-of-type(2)")
	await page.click("#gametype > [data-index='-1']")
	const form = await page.$("body > form")
	if (!form) throw Error("No form.")

	await page.evaluate(`
        cols = document.querySelector("body > form input:nth-of-type(1)")
        if (cols) cols.value = ${subWidth}
    `)

	await page.evaluate(`
        rows = document.querySelector("body > form input:nth-of-type(2)")
        if (rows) rows.value = ${subHeight}
    `)

	const value = calculateDifficultyNumber(options.difficulty)
	await page.evaluate(`
        dropdown = document.querySelector("body > form select:last-of-type")
        if (dropdown) dropdown.selectedIndex = ${value}
    `)

	const submit = await form.$("input:nth-last-child(2)")
	if (!submit) throw Error("No submit button.")

	return await submit.focus().then(() => submit.click())
}

export async function saveToFile(ID: string): Promise<void> {
	return await fs.promises.appendFile("soloids.txt", `${ID}\n`)
}

export const clearFile = async () => await fs.promises.writeFile("soloids.txt", "")
