import generateIDs from "./puppet.js"
import { Difficulty, idToGameBoard, prettyPuzzle } from "./helpers.js"
import express from "express"

import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
	const app = express()
	app.use(express.static(join(__dirname, "../public")))
	app.get("/api/v1/", async (req, res) => {
		try {
			if (isValidRequest(req.query)) {
				const { quantity, size, difficulty } = req.query

				const IDs = await generateIDs({
					quantity: parseInt(quantity as string),
					size: parseInt(size as string),
					difficulty: difficulty as Difficulty,
				})

				const puzzles = IDs.map(idToGameBoard)
				const formatted = []
				// console.log("puzzles")
				for (const puzzle of puzzles) {
					// console.log(puzzle)
					formatted.push(await prettyPuzzle(puzzle))
				}

				const data = { quantity, size, difficulty, IDs, puzzles, formatted }
				// console.log(data)
				res.send(data)
			}
		} catch (error) {
			if (error instanceof QueryError) {
				res.status(400).send(error.message)
			} else {
				console.error(error)
				console.error(error.toString())
				console.error(error.message)
				res.status(500).send("Oops! Something went wrong." + error)
			}
		}
	})

	app.listen(process.env.PORT || 8080, () => console.log("listening!"))
}
main()

class QueryError extends Error {}

function isValidRequest(
	query: typeof express.request.query
): query is { quantity: string; size: string; difficulty: string } {
	if (typeof query.quantity !== "string")
		throw new QueryError("Query did not provide a valid `quantity` parameter. Quantity must be of type `string`.")
	if (!/^[0-9]+$/.test(query.quantity))
		throw new QueryError(
			"Query did not provide a valid `quantity` parameter. Quantity must be of type `string` with only characters 0 through 9."
		)

	if (typeof query.size !== "string")
		throw new QueryError("Query did not provide a valid `size` parameter. Size must be of type `string`.")
	if (!/^[0-9]+$/.test(query.size))
		throw new QueryError(
			"Query did not provide a valid `size` parameter. Size must be of type `string` and represent a number."
		)
	if (parseInt(query.size) > 32)
		throw new QueryError(
			"Query did not provide a valid `size` parameter. Size must be of type `string` and represent a number no larger than 32."
		)

	if (typeof query.difficulty !== "string")
		throw new QueryError(
			"Query did not provide a valid `difficulty` parameter. Difficulty must be of type `string`."
		)
	if (!["Trivial", "Basic", "Intermediate", "Advanced", "Extreme", "Unreasonable"].includes(query.difficulty))
		throw new QueryError(
			"Query did not provide a valid `difficulty` parameter. Difficulty must be of type `string` and be one of `Trivial`, `Basic`, `Intermediate`, `Advanced`, `Extreme`, or `Unreasonable`."
		)
	return true
}
