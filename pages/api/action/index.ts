import type { NextApiRequest, NextApiResponse } from "next";
import ActionService from "../../../backend-services/action";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const event_id = req.query.event_id as string;
      const actions = await ActionService.getAll(event_id);
      res.status(200).json(actions);
      return;
    }

    if (req.method === "POST") {
      const { name, event_id, action_id, endpoint, description } = req.body;
      const action = await ActionService.create({
        name,
        event_id,
        action_id,
        endpoint,
        description,
      });
      res.status(201).json(action);
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
