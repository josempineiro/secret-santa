import React from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Assistant from "components/Assistant";
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
        <AnimatePresence>
          <motion.header
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
            className={cn(["flex flex-col gap-4 p-12 gap-2"])}
          >
            <h1 className={cn(["text-center p-0 m-0 text-5xl font-christmas"])}>
              Secret Santa
            </h1>
            <h2 className={cn(["text-center p-0 m-0 text-2xl font-christmas"])}>
              Game
            </h2>
          </motion.header>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            className="flex-1 items-center justify-center flex flex-col gap-4"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.33,
            }}
          >
            <Assistant message="Invite your friends or family to join and exchange gifts." />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.footer
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className={cn(["p-4 bg-light dark:bg-dark w-full sticky bottom-0"])}
          >
            <Link href="/start">
              <Button kind="primary" className="w-full">
                <div className="absolute -top-full left-1/2 translate-y-1/2 -translate-x-1/2">
                  <svg
                    className="w-6 h-6 animate-bounce fill-dark dark:fill-light stroke-dark dark:stroke-light"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                    />
                  </svg>
                </div>
                <span>Start now!</span>
              </Button>
            </Link>
          </motion.footer>
        </AnimatePresence>
      </div>
    </>
  );
}
