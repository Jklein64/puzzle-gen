const { Builder, By, Key, until } = require("selenium-webdriver")

;(async function example() {
	let driver = await new Builder().forBrowser("safari").build()
	try {
		driver.manage().setTimeouts({ pageLoad: 100000 })
		await driver.get("https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/solo.html")
		const newButton = await driver.wait(until.elementLocated(By.id("new")), 20000) //await driver.findElement(By.id("new"))
		await newButton.click.apply(page)

		const linkButton = await driver.findElement(By.id("permalink-desc"))
		let href = await linkButton.getAttribute("href")
		href = href.substring(href.indexOf("#") + 1)
		console.dir(href)
		// await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN)
		// await driver.wait(until.titleIs("webdriver - Google Search"), 1000)
	} finally {
		await driver.quit()
	}
})()
