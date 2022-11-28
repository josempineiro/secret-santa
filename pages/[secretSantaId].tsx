import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReCAPTCHA } from "react-google-recaptcha";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/Home.module.css";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import {
  Organizer,
  Participant,
  ApiError,
  SecretSanta,
  Participation,
} from "../types";

const defaultParticipant = {
  name: "",
  email: "",
  index: 0,
};

export default function SecretSanta() {
  const router = useRouter();
  const { secretSantaId } = router.query;

  const [participant, setParticipant] =
    React.useState<Participant>(defaultParticipant);

  const { data, isError, error } = useQuery<SecretSanta>(
    [secretSantaId],
    () => {
      return axios.get(`/api/${secretSantaId}`).then((res) => res.data);
    }
  );

  const mutation = useMutation<SecretSanta, ApiError, Participation>(
    (participation: Participation) => {
      return axios
        .post<Participation>(`/api/participate`, participation)
        .catch(function (error) {
          if (error.response) {
            throw error.response.data;
          } else {
            throw error;
          }
        });
    }
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    mutation.mutate({ secretSantaId: secretSantaId as string, participant });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Start a secret santa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {mutation.isError && mutation.error && (
        <div className={styles.AlreadyParticipating}>
          <div className={styles.AlreadyParticipatingContent}>
            <h3 className={styles.AlreadyParticipatingMessage}>
              {mutation.error.message}
            </h3>
          </div>
          <button
            className={styles.TryAgainButton}
            type="button"
            onClick={() => mutation.reset()}
          >
            <span>Try again</span>
          </button>
        </div>
      )}
      {mutation.isSuccess && (
        <div className={styles.AlreadyParticipating}>
          <div className={styles.AlreadyParticipatingContent}>
            <h3 className={styles.AlreadyParticipatingMessage}>
              You have successfully participated in the Secret Santa!
            </h3>
          </div>
          <button
            className={styles.TryAgainButton}
            type="button"
            onClick={() => {
              mutation.reset();
              setParticipant(defaultParticipant);
            }}
          >
            <span>Add more participants</span>
          </button>
        </div>
      )}
      {!mutation.isError && !mutation.isSuccess && (
        <form className={styles.container} onSubmit={handleSubmit}>
          <header className={styles.Header}>
            <h2 className={styles.title}>Hoo Hoo Hoo!</h2>
            <h1 className={styles.title}>Start Secret Santa</h1>

            <p className={styles.description}>
              {data?.organizer.name} is organizing a secret santa!
            </p>
            <h4 className={styles.description}>Participate:</h4>
          </header>
          <main className={styles.main}>
            <ul className={styles.ParticipantList}>
              <AnimatePresence mode={"popLayout" || "sync"}>
                {data && (
                  <motion.div
                    layout
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
                    className={styles.ParticipantItem}
                  >
                    <div className={styles.ParticipantDetails}>
                      <input
                        type="text"
                        placeholder="Name"
                        autoFocus
                        value={participant.name}
                        className={styles.ParticipantNameInput}
                        onChange={(event) => {
                          setParticipant((participant) => ({
                            ...participant,
                            name: event.target.value,
                          }));
                        }}
                      />

                      <input
                        placeholder="Email"
                        type="email"
                        value={participant.email}
                        className={styles.ParticipantNameEmail}
                        onChange={(event) => {
                          setParticipant((participant) => ({
                            ...participant,
                            email: event.target.value,
                          }));
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ul>
          </main>
          <AnimatePresence>
            {participant.name && participant.email && (
              <motion.footer
                className={styles.Footer}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <button className={styles.AddParticipantButton} type="submit">
                  <span>Participate</span>
                </button>
              </motion.footer>
            )}
          </AnimatePresence>
        </form>
      )}
    </>
  );
}
