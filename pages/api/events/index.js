import { events } from "./data.json";

export default function handler(req, res) {
	if (req.method === "GET") {
		res.status(200).json(events);
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: "Only method allowed: GET" });
	}
}
