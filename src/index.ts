import generateIDs from "./puppet.js"
import { idToGameBoard, prettyPuzzle } from "./helpers.js"

async function main() {
	const IDs = await generateIDs({
		quantity: 10,
		size: 9,
		difficulty: "Trivial",
	})

	if (IDs === undefined) return
	const boards = IDs.map(idToGameBoard)
	try {
		console.log(await prettyPuzzle(boards[0]))
	} catch (error) {
		console.error(error)
	}
}
main()
