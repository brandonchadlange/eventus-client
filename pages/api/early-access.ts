import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../utils/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;

    await prismaClient.earlyAccess.create({
      data: {
        email,
      },
    });

    return res.status(201).send(true);
  }

  res.status(405).send({ error: "Method not allowed" });
}
