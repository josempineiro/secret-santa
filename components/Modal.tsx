import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function Modal({
  visible,
  onClose,
  children,
  title,
}: ModalProps) {
  return createPortal(
    <AnimatePresence>
      {visible && (
        <div className={styles.Modal}>
          <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring" }}
            className={styles.Modal}
          >
            <div className={styles.ModalHeader}>
              <span className={styles.ModalTitle}>{title}</span>
              <button
                className={styles.ModalCloseButton}
                onClick={() => {
                  onClose();
                }}
              >
                <span>Close</span>
              </button>
            </div>

            <div className={styles.ModalContent}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root") as HTMLElement
  );
}
