import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { Participant } from "types";
import { validateEmail } from "utils";
import TextField from "components/TextField";
import Modal from "components/Modal";
import Button from "components/Button";

interface ParticipantsListProps {
  value: Participant[];
  onChange: (participants: Participant[]) => void;
}

const defaultParticipant = {
  name: "",
  email: "",
  index: 0,
};

export default function ParticipantsList({
  value,
  onChange,
}: ParticipantsListProps) {
  const [visibleNewParticipantModal, setVisibleNewParticipantModal] =
    React.useState<boolean>(false);
  const [newParticipant, setNewParticipant] =
    React.useState<Participant>(defaultParticipant);

  const repeatedParticipant = React.useMemo(() => {
    return (
      value.findIndex(
        (participant) =>
          participant.name === newParticipant.name ||
          participant.email === newParticipant.email
      ) !== -1
    );
  }, [value, newParticipant]);
  const repeatedParticipantError = React.useMemo(() => {
    if (
      value.findIndex(
        (participant) => participant.name === newParticipant.name
      ) !== -1
    ) {
      return "A participant with this name already exists";
    } else if (
      value.findIndex(
        (participant) => participant.email === newParticipant.email
      ) !== -1
    ) {
      return "A participant with this email already exists";
    }
  }, [value, newParticipant]);

  const participantIsValid = (
    participant: Participant,
    index: number,
    participants: Participant[]
  ) => {
    return (
      participant.name.length > 0 &&
      participant.email.length > 0 &&
      validateEmail(participant.email) &&
      participants.findIndex(
        (participantB) =>
          participant.email === participantB.email ||
          participant.name === participantB.name
      ) === index
    );
  };
  return (
    <>
      <Modal
        title="Add participant"
        visible={visibleNewParticipantModal}
        onClose={() => {
          setVisibleNewParticipantModal(false);
        }}
      >
        <div className={cn(["flex flex-col gap-6 w-full h-full  flex-1"])}>
          <div className={cn([""])}>
            <TextField
              type="text"
              label="Name"
              autoFocus
              className="mb-6"
              value={newParticipant.name}
              onChange={(name) => {
                setNewParticipant((newParticipant) => ({
                  ...newParticipant,
                  name,
                }));
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={newParticipant.email}
              onChange={(email) => {
                setNewParticipant((newParticipant) => ({
                  ...newParticipant,
                  email,
                }));
              }}
            />
          </div>
          <AnimatePresence mode={"popLayout"}>
            {repeatedParticipant && (
              <motion.div
                key="warning"
                initial={{ opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
                className={cn([
                  "flex flex-row gap-4 p-4 border border-red-500 text-red-500 rounded",
                ])}
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
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                {repeatedParticipantError}
              </motion.div>
            )}
            {participantIsValid(newParticipant, value.length, [
              ...value,
              {
                ...newParticipant,
                index: value.length,
              },
            ]) && (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <Button
                  kind="primary"
                  className="w-full"
                  onClick={() => {
                    setNewParticipant(defaultParticipant);
                    onChange([
                      ...value,
                      {
                        ...newParticipant,
                        index: value.length,
                      },
                    ]);
                    setVisibleNewParticipantModal(false);
                  }}
                >
                  <span>Add Participant</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
      <ul
        className={cn([
          "flex flex-1 w-full h-full gap-5 m-0 p-0 flex-col overflow-scroll",
        ])}
      >
        <AnimatePresence mode={"popLayout" || "sync"}>
          {value.map((participant, id) => (
            <motion.li
              layout
              key={participant.index}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className={cn(["w-full flex items-center gap-4"])}
            >
              <span className={cn(["text-xs"])}>{id + 1}</span>
              <div
                className={cn([
                  "flex w-full flex-col justify-between items-start min-w-0",
                ])}
              >
                <b>{participant.name}</b>
                <span className="truncate">{participant.email}</span>
              </div>
              <Button
                kind="text"
                size="small"
                onClick={() => {
                  onChange(value.filter((p, index) => id !== index));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </Button>
            </motion.li>
          ))}
          {value.every(participantIsValid) && (
            <motion.li
              layout
              key={"add"}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className={cn(["w-full flex items-center gap-4 sticky bottom-0"])}
            >
              <Button
                kind="primary"
                className="w-full"
                onClick={() => {
                  setVisibleNewParticipantModal(true);
                }}
              >
                <span>Add Participant</span>
              </Button>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </>
  );
}
