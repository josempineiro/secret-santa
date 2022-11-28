import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SecretSantaWizard.module.css";
import { SecretSanta } from "../types";
import ParticipantsList from "./ParticipantsList";
import TextField from "./TextField";

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
          label="Name"
          value={secretSanta.name}
          onChange={(value) => {
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
      return Boolean(secretSanta.organizer.name && secretSanta.organizer.email);
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <>
          <TextField
            label="Name"
            type="text"
            value={secretSanta.organizer.name}
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
            label="Email"
            value={secretSanta.organizer.email}
            onChange={(value) => {
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
        <TextField
          label="Date"
          type="date"
          value={secretSanta.drawDate.toISOString().split("T")[0]}
          onChange={(value) => {
            setSecretSanta({
              ...secretSanta,
              drawDate: new Date(value),
            });
          }}
        />
      );
    },
  },
  {
    id: "password",
    title: "Password",
    description: "Provide a password to protect your Secret Santa",
    validate: (secretSanta: SecretSanta) => {
      return secretSanta.password;
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <TextField
          label="Password"
          type="password"
          value={secretSanta.password}
          onChange={(value) => {
            setSecretSanta({
              ...secretSanta,
              password: value,
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
      return secretSanta.participants.length >= 0;
    },
    content: ({ secretSanta, setSecretSanta }: SecretSantaStep) => {
      return (
        <>
          <ParticipantsList
            value={secretSanta.participants}
            onChange={(participants) => {
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
      name: "Leman",
      email: "leman@leman.com",
    },
    drawDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    participants: [],
    password: "1234",
    name: "Secret santa",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(secretSanta);
  };

  return (
    <form className={styles.Wizard} onSubmit={handleSubmit}>
      {steps.map((step, index) => {
        return (
          <AnimatePresence key={step.id} mode={"popLayout"}>
            {step.id === steps[activeStep].id && (
              <motion.div
                key={step.id}
                className={styles.Step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.StepHeader}>
                  <h2>
                    {index + 1}. {step.title}
                  </h2>
                  <p>{step.description}</p>
                </div>
                <div className={styles.StepContent}>
                  {step.content({ secretSanta, setSecretSanta })}
                </div>
                <div className={styles.StepButtons}>
                  {activeStep > 0 && (
                    <button
                      type="button"
                      className={styles.NextStepButton}
                      onClick={() => {
                        setActiveStep(activeStep - 1);
                      }}
                    >
                      {steps[activeStep - 1].title}
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={!step.validate(secretSanta)}
                    className={styles.NextStepButton}
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
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </form>
  );
}
