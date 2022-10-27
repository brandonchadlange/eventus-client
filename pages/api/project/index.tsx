import type { NextApiRequest, NextApiResponse } from "next";
import ProjectService from "../../../backend-services/project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const projects = await ProjectService.getAll();
      res.status(200).json(projects);
      return;
    }

    if (req.method === "POST") {
      const { name, project_id } = req.body;
      const project = await ProjectService.create(name, project_id);
      res.status(201).json(project);
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
