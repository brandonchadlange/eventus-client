import type { NextApiRequest, NextApiResponse } from "next";
import EventService from "../../../backend-services/event";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const events = await EventService.getAll();
      res.status(200).json(events);
      return;
    }

    if (req.method === "POST") {
      const { name, event_id, description } = req.body;
      const event = await EventService.create(event_id, name, description);
      res.status(201).json(event);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    return;
  }

  res.status(405).json({
    message: "Method not allowed",
  });
}
