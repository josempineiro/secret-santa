import firebaseAdmin from "firebase-admin";

const serviceAccount: firebaseAdmin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "secretsanta-2022",
  clientEmail:
    process.env.FIREBASE_CLIENT_EMAIL ||
    "firebase-adminsdk-ddr6y@secretsanta-2022.iam.gserviceaccount.com",
  privateKey: (
    process.env.FIREBASE_PRIVATE_KEY ||
    "AIzaSyB0aWgQDU1-56IPaXbPwXMDatkrJO1Hol4"
  ).replace(/\\n/g, "\n"),
};
let app: firebaseAdmin.app.App;

if (!firebaseAdmin.apps[0]) {
  try {
    app = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });

    firebaseAdmin.firestore().settings({ ignoreUndefinedProperties: true });
  } catch (error: any) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      console.error("Firebase firebaseAdmin initialization error", error.stack);
      throw error;
    }
  }
} else {
  app = firebaseAdmin.apps[0];
}

const firestore: FirebaseFirestore.Firestore = firebaseAdmin.firestore();

export { firestore };
