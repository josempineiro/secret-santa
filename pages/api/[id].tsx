// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "config/firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import type { SecretSanta, ApiError } from "types";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SecretSanta | ApiError>
) {
  if (req.method === "GET") {
    const snapshot = await firestore
      .collection("secretsanta")
      .doc(req.query.id as string)
      .get();

    const data = snapshot.data() as SecretSanta;

    const isValidPassword = await bcrypt.compare(
      req.query.password as string,
      data.password
    );

    if (isValidPassword) {
      res.status(200).json({
        ...data,
        id: snapshot.id,
      });
    } else {
      res.status(401).json({
        message:
          "The password is incorrect, try again or contact the organizer",
      });
    }
  }
}
