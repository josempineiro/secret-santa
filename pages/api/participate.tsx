// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "config/firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import { SecretSanta } from "types";

type Organizer = {
  name: string;
  email: string;
};

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SecretSanta | Error>
) {
  if (req.method === "POST") {
    const documentRef = await firestore
      .collection("secretsanta")
      .doc(req.body.secretSantaId);
    const snapshot = await documentRef.get();
    const secretSanta = snapshot.data() as SecretSanta;
    if (snapshot.exists) {
      if (
        secretSanta.participants.find(
          (participant: any) =>
            participant.name === req.body.participant.name &&
            participant.email !== req.body.participant.email
        )
      ) {
        res.status(400).json({
          message: `Oops! There is an participant with the same name, <b class="text-primary">${req.body.participant.name}</b>!\nPlease, choose another name!`,
        });
      } else if (
        secretSanta.participants.find(
          (participant: any) => participant.email === req.body.participant.email
        )
      ) {
        res.status(409).json({ message: "You are already participating!" });
      } else {
        documentRef.update({
          participants: [...secretSanta.participants, req.body.participant],
        });
        res.status(200).json({
          id: snapshot.id,
          ...secretSanta,
        });
      }
    } else {
      res.status(404).json({
        message: "Secret Santa not found",
      });
    }
  }
}
