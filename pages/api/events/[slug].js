import { events } from "./data.json";

export default function handler(req, res) {
	const evt = events.filter((event) => event.slug === req.query.slug);
	if (req.method === "GET") {
		if (evt) {
			res.status(200).json(evt);
		} else {
			res.status(400).json({ message: "event not found" });
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: "Only method allowed: GET" });
	}
}
