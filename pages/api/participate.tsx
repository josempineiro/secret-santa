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
  if (req.method === "POST") {
    const documentRef = await firestore
      .collection("secretsanta")
      .doc(req.body.secretSantaId);
    const snapshot = await documentRef.get();
    if (snapshot.exists) {
      if (
        snapshot
          .data()
          .participants.find(
            (participant: any) =>
              participant.email === req.body.participant.email
          )
      ) {
        res.status(400).json({ message: "Participant already exists" });
      } else {
        documentRef.update({
          participants: [...snapshot.data().participants, req.body.participant],
        });
        res.status(200).json({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }
    } else {
      res.status(404).json({
        message: "Secret Santa not found",
      });
    }
  }
}
