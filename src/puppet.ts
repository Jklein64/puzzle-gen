import Puppeteer from "puppeteer"
import { clearFile, findGameID, newGame, Difficulty } from "./helpers.js"

export default async function generateIDs(options: { quantity: number; size: number; difficulty: Difficulty }) {
	try {
		const browser = await Puppeteer.launch()
		const page = await browser.newPage()
		await page.goto("https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/solo.html")

		await clearFile()

		const output = []

		for (let i = 0; i < options.quantity; i++) {
			await newGame(page, { size: options.size, difficulty: options.difficulty })
			const gameID = await page.evaluate(findGameID)
			if (gameID) {
				// saveToFile(gameID)
				output.push(gameID)
			}
		}

		await browser.close()
		return output
		// browser.close().then(() => {
		// const python = exec("npm run python")
		// python.on("close", async (code, signal) => {
		// 	console.log("python done")
		// 	const output = await fs.promises.readFile(join(__dirname, "../solo_sudoku_test_cases.txt"), {
		// 		encoding: "utf-8",
		// 	})
		// 	console.log(output)
		// })
		// })
	} catch (e) {
		console.error(e)
	}
}
