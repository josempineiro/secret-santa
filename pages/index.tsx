import React from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface Participant {
  index: number;
  name: string;
  email: string;
}

export default function Home() {
  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const index = React.useRef(0);
  return (
    <>
      <Head>
        <title>Secret Santa</title>
        <meta name="description" content="Start a Secret Santa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header className={styles.Header}>
          <h1 className={styles.title}>Secret Santa</h1>

          <p className={styles.description}>
            Add participants and generate a secret santa list
          </p>
        </header>
        <footer className={styles.Footer}>
          <Link href="/start">
            <button className={styles.AddParticipantButton}>
              <span>Start Secret Santa</span>
            </button>
          </Link>
        </footer>
      </div>
    </>
  );
}
