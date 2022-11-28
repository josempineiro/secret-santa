import React from "react";
import Head from "next/head";
import { useMutation } from "react-query";
import axios from "axios";
import SecretSantaWizard, {
  SecretSanta,
} from "../components/SecretSantaWizard";

export default function Home() {
  const mutation = useMutation((secretSanta: SecretSanta) => {
    return axios.post("/api/start", secretSanta);
  });
  const handleSubmit = (secretSanta: SecretSanta) => {
    mutation.mutate(secretSanta);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Start a secret santa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SecretSantaWizard onSubmit={handleSubmit} />
    </>
  );
}
