// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "config/firebase";
import type { NextApiRequest, NextApiResponse } from "next";

type Organizer = {
  name: string;
  email: string;
};

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Organizer | Error>
) {
  if (req.method === "GET") {
    const snapshot = await firestore
      .collection("secretsanta")
      .doc(req.query.id)
      .get();

    res.status(200).json({
      id: snapshot.id,
      ...snapshot.data(),
    });
  }
}
