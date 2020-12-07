import Puppeteer from "puppeteer"
import { clearFile, findGameID, newGame, Difficulty } from "./helpers.js"

export default async function generateIDs(options: { quantity: number; size: number; difficulty: Difficulty }) {
	const output = []
	try {
		const browser = await Puppeteer.launch({ args: ["--no-sandbox"] })
		const page = await browser.newPage()
		await page.goto("https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/solo.html")

		await clearFile()

		for (let i = 0; i < options.quantity; i++) {
			await newGame(page, { size: options.size, difficulty: options.difficulty })
			const gameID = await page.evaluate(findGameID)
			if (gameID) output.push(gameID)
		}

		await browser.close()
	} catch (e) {
		console.error(e)
	} finally {
		return output
	}
}
