import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Assistant from "components/Assistant";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import Button from "components/Button";
import { Participant, ApiError, SecretSanta, Participation } from "../types";
import TextField from "components/TextField";
import { validateEmail } from "utils";

const defaultParticipant = {
  name: "",
  email: "",
};

type GetSecretSantaResponse = {
  data: SecretSanta;
};

export default function SecretSantaPage() {
  const router = useRouter();
  const { secretSantaId } = router.query;

  const [participant, setParticipant] =
    React.useState<Participant>(defaultParticipant);
  const [password, setPassword] = React.useState<string>("");

  const secretSantaQuery = useQuery<
    GetSecretSantaResponse,
    AxiosError<ApiError>
  >(
    [secretSantaId],
    () => axios.get(`/api/${secretSantaId}?password=${password}`),
    {
      enabled: false,
      retry: false,
    }
  );

  const participateMutation = useMutation<
    SecretSanta,
    AxiosError<ApiError, ApiError>,
    Participation
  >((participation: Participation) => {
    return axios.post(`/api/participate`, participation);
  }, {});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    participateMutation.mutate({
      secretSantaId: secretSantaId as string,
      participant,
    });
  };

  const secretSantaMessage = React.useMemo(() => {
    if (participateMutation.isSuccess && secretSantaQuery.data) {
      return `You have successfully participated in the Secret Santa!\nYou will receive an email on ${new Date(
        secretSantaQuery.data.data.drawDate
      ).toLocaleString()}\nGood luck!`;
    } else if (participateMutation.isError && participateMutation.error) {
      return participateMutation.error.response?.data.message as string;
    } else if (!secretSantaQuery.isFetched) {
      return "Enter the password to join the Secret Santa";
    } else if (secretSantaQuery.isFetching) {
      return "Let me check if you're on the list...";
    } else if (secretSantaQuery.isError && secretSantaQuery.error) {
      return secretSantaQuery.error?.response?.data.message as string;
    } else if (
      secretSantaQuery.isSuccess &&
      secretSantaQuery.data.data.completed
    ) {
      return "The Secret Santa has already been drawn!\nCheck your email!";
    } else if (secretSantaQuery.isSuccess) {
      return `${secretSantaQuery.data.data.organizer.name} is organizing <b class="text-santa dark:text-grinch">${secretSantaQuery.data.data.name}</b>'s Secret Santa!\nSend your participation!`;
    } else {
      return "";
    }
  }, [
    participateMutation.error,
    participateMutation.isError,
    participateMutation.isSuccess,
    secretSantaQuery.data,
    secretSantaQuery.error,
    secretSantaQuery.isError,
    secretSantaQuery.isFetched,
    secretSantaQuery.isFetching,
    secretSantaQuery.isSuccess,
  ]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Start a secret santa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={cn([
          "flex h-full flex-col items-center w-full gap-20 justify-center p-4",
        ])}
      >
        <Assistant
          variant={
            !secretSantaQuery.isSuccess && password ? "eyes-closed" : "default"
          }
          messagePosition="top"
          message={secretSantaMessage}
        />
        {(!password || !secretSantaQuery.isFetched) && (
          <form
            className="w-full"
            onSubmit={(event) => {
              event.preventDefault();
              secretSantaQuery.refetch();
            }}
          >
            <TextField
              label="Password"
              type="password"
              value={password}
              className="w-full mb-6"
              onChange={(password) => setPassword(password)}
            />
            <Button
              type="submit"
              className="w-full"
              kind="primary"
              disabled={!password}
              loading={secretSantaQuery.isLoading}
            >
              Join
            </Button>
          </form>
        )}
        {password &&
          secretSantaQuery.isError &&
          secretSantaQuery.error &&
          secretSantaQuery.error.response?.status === 401 && (
            <Button
              type="button"
              kind="primary"
              onClick={() => {
                secretSantaQuery.remove();
                setPassword("");
              }}
            >
              <span>Try again</span>
            </Button>
          )}
        {participateMutation.isError &&
          participateMutation.error &&
          participateMutation.error.response?.status === 400 && (
            <Button
              type="button"
              kind="primary"
              onClick={() => participateMutation.reset()}
            >
              <span>Try again</span>
            </Button>
          )}
        {(participateMutation.isSuccess ||
          (participateMutation.isError &&
            participateMutation.error &&
            participateMutation.error.response?.status === 409)) && (
          <Button
            type="button"
            kind="primary"
            className="w-full"
            onClick={() => {
              participateMutation.reset();
              setParticipant(defaultParticipant);
            }}
          >
            <span>Add more participants</span>
          </Button>
        )}
        {secretSantaQuery.isSuccess &&
          secretSantaQuery.data.data.completed &&
          null}
        {!participateMutation.isError &&
          !participateMutation.isSuccess &&
          secretSantaQuery.isSuccess &&
          !secretSantaQuery.data.data.completed && (
            <form className="w-full" onSubmit={handleSubmit}>
              <AnimatePresence mode={"popLayout" || "sync"}>
                {secretSantaQuery.data && (
                  <motion.div
                    layout
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
                    className={"w-full"}
                  >
                    <TextField
                      label="Name"
                      type="text"
                      className="mb-4"
                      value={participant.name}
                      onChange={(name) =>
                        setParticipant({ ...participant, name })
                      }
                    />
                    <TextField
                      label="Email"
                      type="email"
                      className="mb-4"
                      value={participant.email}
                      onChange={(email) =>
                        setParticipant({ ...participant, email })
                      }
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      kind="primary"
                      loading={participateMutation.isLoading}
                      disabled={
                        !(participant.name && validateEmail(participant.email))
                      }
                    >
                      <span>Participate</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
      </div>
    </>
  );
}
