import generateIDs from "./puppet.js"
import { Difficulty, idToGameBoard, prettyPuzzle } from "./helpers.js"
import express from "express"

async function main() {
	const app = express()
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
				for (const puzzle of puzzles) formatted.push(await prettyPuzzle(puzzle))

				res.send(JSON.stringify({ quantity, size, difficulty, IDs, puzzles, formatted }))
			}
		} catch (error) {
			if (error instanceof QueryError) {
				res.status(400).send(error.message)
			} else {
				res.status(500).send("Oops! Something went wrong." + error.message)
			}
		}
	})

	app.listen(process.env.PORT || 8080, () => console.log("listening!"))
}
main()

class QueryError extends Error {}

function isValidRequest(query: typeof express.request.query) {
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
