import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import cn from "classnames";
import Button from "components/Button";

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
  useEffect(() => {
    if (visible) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [visible, onClose]);
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [visible]);
  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring" }}
          className={cn([
            "flex flex-col gap-4 justify-between ",
            "absolute w-full h-full top-0 left-0 bg-light dark:bg-dark p-4 overflow-scroll",
          ])}
        >
          <div className={cn(["flex justify-between items-center"])}>
            <span className={cn(["text-lg"])}>{title}</span>
            <Button
              kind="text"
              className={cn("text-2xl")}
              onClick={() => {
                onClose();
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          <div className={cn(["flex-1"])}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root") as HTMLElement
  );
}
