import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import { SecretSanta } from "types";
import SecretSantaWizard from "components/SecretSantaWizard";
import SecretSantaShare from "components/SecretSantaShare";

const createSecretSanta = async (secretSanta: SecretSanta) =>
  axios.post("/api/start", secretSanta);

export default function Home() {
  const router = useRouter();
  const createSecretSantaMutation = useMutation(createSecretSanta);
  const handleSubmit = (secretSanta: SecretSanta) => {
    createSecretSantaMutation.mutate(secretSanta);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Start a secret santa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {createSecretSantaMutation.isSuccess ? (
        <SecretSantaShare
          secretSanta={createSecretSantaMutation.data.data as SecretSanta}
        />
      ) : (
        <SecretSantaWizard onSubmit={handleSubmit} />
      )}
    </>
  );
}
