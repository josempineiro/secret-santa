// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "config/firebase";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type Organizer = {
  name: string;
  email: string;
};

type Error = {
  message: string;
};

interface PublicSecretSanta {
  id: string;
  organizer: Organizer;
  participants: string[];
}

async function encriptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicSecretSanta | Error>
) {
  if (req.method === "POST") {
    const password = await encriptPassword(req.body.password);
    const snapshot = await (
      await firestore.collection("secretsanta").add({
        organizer: {
          name: req.body.organizer.name,
          email: req.body.organizer.email,
        },
        participants: req.body.participants,
        password,
      })
    )
      .get()
      .catch((error: any) => {
        console.error(error);
        res.status(500).json({ message: error.message });
      });
    res.status(200).json({
      id: snapshot.id,
      organizer: snapshot.data()?.organizer,
      participants: snapshot.data()?.participants,
    });
  }
}
