import React from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Santa from "components/Santa";
import Button from "components/Button";
import cn from "classnames";

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

      <div className={cn(["h-screen flex flex-col justify-evenly"])}>
        <header className={cn(["flex flex-col gap-4 p-4"])}>
          <h1 className={cn(["text-center p-0 m-0 text-5xl p-8"])}>
            Secret Santa
          </h1>

          <p className={cn(["text-center p-0 m-0 text-xl"])}>
            Invite your friends and family to join in the fun and exchange
            gifts.
          </p>
        </header>
        <AnimatePresence>
          <motion.div
            className="flex-1 items-center justify-center flex flex-col gap-4"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <Santa />
          </motion.div>
        </AnimatePresence>
        <footer className={cn(["p-4 bg-black w-full sticky bottom-0"])}>
          <Link href="/start">
            <Button kind="primary" className="w-full">
              <span>Start now!</span>
            </Button>
          </Link>
        </footer>
      </div>
    </>
  );
}
