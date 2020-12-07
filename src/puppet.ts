import Puppeteer from "puppeteer"
import { exec } from "child_process"
import { clearFile, findGameID, saveToFile, newGame } from "./helpers.js"

const NUM_IDS = 10
;(async () => {
	try {
		const browser = await Puppeteer.launch()
		const page = await browser.newPage()

		await clearFile()
		await page.goto("https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/solo.html")

		for (let i = 0; i < NUM_IDS; i++) {
			const gameID = await page.evaluate(findGameID)
			if (gameID) {
				console.log(gameID)
				saveToFile(gameID)
			}
			await newGame(page)
		}
		browser.close().then(() => {
			exec("python ../soloparser.py")
		})
	} catch (e) {
		console.error(e)
	}
})()
