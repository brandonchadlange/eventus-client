// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await awaiter(5000);
  res.status(200).json({ name: "John Doe" });
}

const awaiter = async (timeInMs: number) => {
  return new Promise((res: any) => {
    setTimeout(() => {
      res();
    }, timeInMs);
  });
};
