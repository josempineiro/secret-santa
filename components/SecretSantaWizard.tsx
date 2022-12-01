import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { validateEmail } from "utils";
import { SecretSanta, Participant } from "types";
import ParticipantsList from "components/ParticipantsList";
import Button from "components/Button";
import TextField from "components/TextField";

const passwordLength = process.env.SECRET_SANTA_PASSWORD_LENGTH
  ? Number(process.env.SECRET_SANTA_PASSWORD_LENGTH)
  : 4;

interface SecretSantaWizardProps {
  onSubmit: (secretSanta: SecretSanta) => void;
}

interface SecretSantaStep {
  secretSanta: SecretSanta;
  setSecretSanta: React.Dispatch<React.SetStateAction<SecretSanta>>;
}

const steps = [
  {
    id: "name",
    title: "Name",
    description: "What is the name of your Secret Santa?",
    validate: (secretSanta: SecretSanta) => {
      return secretSanta.name.length > 0;
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <TextField
          label="Group name"
          value={secretSanta.name}
          onChange={(value: string) => {
            setSecretSanta({
              ...secretSanta,
              name: value,
            });
          }}
        />
      );
    },
  },
  {
    id: "organizer",
    title: "Organizer",
    description: "Who is organizing this Secret Santa?",
    validate: (secretSanta: SecretSanta) => {
      return Boolean(
        secretSanta.organizer.name && validateEmail(secretSanta.organizer.email)
      );
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <>
          <TextField
            label="Your name"
            type="text"
            value={secretSanta.organizer.name}
            className="mb-4"
            onChange={(value: string) => {
              setSecretSanta({
                ...secretSanta,
                organizer: {
                  ...secretSanta.organizer,
                  name: value,
                },
              });
            }}
          />
          <TextField
            label="Your email"
            value={secretSanta.organizer.email}
            type="email"
            onChange={(value: string) => {
              setSecretSanta({
                ...secretSanta,
                organizer: {
                  ...secretSanta.organizer,
                  email: value,
                },
              });
            }}
          />
        </>
      );
    },
  },
  {
    id: "drawDate",
    title: "Draw date and time",
    description: "When should the draw take place?",
    validate: (secretSanta: SecretSanta) => {
      return secretSanta.drawDate;
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <>
          <TextField
            label="Draw date"
            type="datetime-local"
            value={secretSanta.drawDate}
            onChange={(drawDate: string) => {
              setSecretSanta({
                ...secretSanta,
                drawDate: drawDate.split(/:/)[0] + ":00",
              });
            }}
          />
        </>
      );
    },
  },
  {
    id: "password",
    title: "Password",
    description: "Provide a password to protect your Secret Santa",
    validate: (secretSanta: SecretSanta) => {
      return secretSanta.password.length >= passwordLength;
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <TextField
          label="Group password"
          type="password"
          value={secretSanta.password}
          onChange={(password: string) => {
            setSecretSanta({
              ...secretSanta,
              password,
            });
          }}
        />
      );
    },
  },
  {
    id: "participants",
    title: "Participants",
    description:
      "Add some participants in the secret santa.\nOr share the link with your friends and let them add themselves.",
    validate: (secretSanta: SecretSanta) => {
      return secretSanta.participants.every(
        (participant, index, allParticipants) => {
          return (
            Boolean(participant.name && validateEmail(participant.email)) &&
            allParticipants.findIndex(
              ({ email }) => email === participant.email
            ) === index
          );
        }
      );
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <>
          {secretSanta.participants.length === 0 && (
            <p className="py-8">
              You can share with your friends so they can add themselves to the
              Secret Santa.
            </p>
          )}
          <ParticipantsList
            value={secretSanta.participants}
            onChange={(participants: Participant[]) => {
              setSecretSanta({
                ...secretSanta,
                participants,
              });
            }}
          />
        </>
      );
    },
  },
];

export default function SecretSantaWizard({
  onSubmit,
}: SecretSantaWizardProps) {
  const [secretSanta, setSecretSanta] = React.useState<SecretSanta>({
    organizer: {
      name: "",
      email: "",
    },
    drawDate:
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split(/:\d\d:\d\d\./)[0] + ":00",
    participants: [
      ...Array.from(new Array(20)).map((_, index) => ({
        name: `John Doe ${index}`,
        email: `johndoe${index}@gmail.com`,
        index,
      })),
    ],
    password: "",
    name: "",
  });
  const [activeStep, setActiveStep] = React.useState(3);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(secretSanta);
  };

  return (
    <form
      className={cn(["w-full h-full flex flex-col gap-4"])}
      onSubmit={handleSubmit}
    >
      {steps.map((step, index) => {
        return (
          <AnimatePresence key={step.id} mode={"popLayout"}>
            {step.id === steps[activeStep].id && (
              <motion.div
                key={step.id}
                className={cn(["flex flex-col h-full"])}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={cn(["py-8 p-4"])}>
                  <h2 className={cn(["text-4xl mb-4"])}>{step.title}</h2>
                  <p className={cn(["text-xl"])}>{step.description}</p>
                </div>
                <div
                  className={cn([
                    "flex-1 flex flex-col justify-start items-center overflow-hidden px-4 ",
                  ])}
                >
                  {step.content({ secretSanta, setSecretSanta })}
                </div>
                <div
                  className={cn([
                    "flex justify-between items-center gap-4 p-4 bg-black w-full sticky bottom-0",
                  ])}
                >
                  <Button
                    type="button"
                    kind="text"
                    disabled={activeStep === 0}
                    className={cn([
                      {
                        invisible: activeStep === 0,
                      },
                    ])}
                    onClick={() => {
                      setActiveStep(activeStep - 1);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    kind="primary"
                    disabled={!step.validate(secretSanta)}
                    onClick={() => {
                      if (activeStep === steps.length - 1) {
                        onSubmit(secretSanta);
                      } else {
                        setActiveStep(activeStep + 1);
                      }
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? "Start secret santa"
                      : "Continue"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </form>
  );
}
