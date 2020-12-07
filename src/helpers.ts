//@ts-check
import fs from "fs"
import Puppeteer from "puppeteer"

export function findGameID() {
	return document?.querySelector("#permalink-desc")?.getAttribute("href")?.substring(1)
}

export async function newGame(page: Puppeteer.Page, size?: number) {
	console.log("requested size", size)
	return await page.click("#new")
}

export async function saveToFile(ID: string): Promise<void> {
	return await fs.promises.appendFile("soloids.txt", `${ID}\n`)
}

export const clearFile = async () => await fs.promises.writeFile("soloids.txt", "")
