import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ParticipantsList.module.css";
import { Participant } from "../types";
import TextField from "./TextField";
import Modal from "./Modal";

interface ParticipantsListProps {
  value: Participant[];
  onChange: (participants: Participant[]) => void;
}

const participantIsValid = (participant: Participant) => {
  return participant.name.length > 0 && participant.email.length > 0;
};

export default function ParticipantsList({
  value,
  onChange,
}: ParticipantsListProps) {
  const [visibleNewParticipantModal, setVisibleNewParticipantModal] =
    React.useState<boolean>(false);
  const [newParticipant, setNewParticipant] = React.useState<Participant>({
    name: "",
    email: "",
    index: value.length,
  });
  return (
    <>
      <Modal
        title="Add participant"
        visible={visibleNewParticipantModal}
        onClose={() => {
          setVisibleNewParticipantModal(false);
        }}
      >
        <div className={styles.ParticipantModalContent}>
          <div className={styles.ParticipantModalDetails}>
            <TextField
              type="text"
              label="Name"
              autoFocus
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
          <button
            className={styles.Add}
            disabled={!participantIsValid(newParticipant)}
            onClick={() => {
              onChange([...value, newParticipant]);
              setVisibleNewParticipantModal(false);
            }}
          >
            <span>Add Participant</span>
          </button>
        </div>
      </Modal>
      <ul className={styles.ParticipantList}>
        <AnimatePresence mode={"popLayout" || "sync"}>
          {value.map((participant, id) => (
            <motion.li
              layout
              key={participant.index}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className={styles.ParticipantItem}
            >
              <span className={styles.ParticipantId}>{id}</span>
              <div className={styles.ParticipantDetails}>
                <b>{participant.name}</b>
                <span>{participant.email}</span>
              </div>
              <button
                className={styles.ParticipantAddButton}
                onClick={() => {
                  onChange(value.filter((p, index) => id !== index));
                }}
              >
                <span>X</span>
              </button>
            </motion.li>
          ))}
          {value.every(participantIsValid) && (
            <motion.li
              layout
              key={"add"}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className={styles.ParticipantItem}
            >
              <button
                onClick={() => {
                  setVisibleNewParticipantModal(true);
                }}
              >
                <span>Add Participant</span>
              </button>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </>
  );
}
