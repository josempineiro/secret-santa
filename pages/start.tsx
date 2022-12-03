import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import { SecretSanta } from "types";
import SecretSantaWizard from "components/SecretSantaWizard";
import LoaderBoundary from "components/LoaderBoundary";

const createSecretSanta = async (secretSanta: SecretSanta) =>
  axios.post("/api/start", secretSanta);

export default function Home() {
  const router = useRouter();
  const createSecretSantaMutation = useMutation(createSecretSanta, {
    onSuccess: (data) => {
      router.push(`/${data.data.id}`);
    },
  });
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
      <SecretSantaWizard onSubmit={handleSubmit} />
    </>
  );
}
