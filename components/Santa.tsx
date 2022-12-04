import React from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Santa.module.css";
const Message = ({ message }: { message: string }) => {};
const Santa = ({
  className,
  message,
  messagePosition = "top",
  variant = "default",
}: {
  className?: string;
  message: string;
  messagePosition?: "top" | "right";
  variant?: "default" | "eyes-closed";
}) => {
  return (
    <div
      className={cn([
        className,
        styles.Santa,
        {
          [styles["Santa--eyes-closed"]]: variant === "eyes-closed",
        },
      ])}
    >
      <AnimatePresence>
        <motion.div
          key={message}
          className={cn([
            "absolute transform",
            {
              "left-1/2 -top-full -translate-y-full -translate-x-1/2 w-80":
                messagePosition === "top",
              "-right-4 top-1/2 translate-x-full -translate-y-1/2 w-60":
                messagePosition === "right",
            },
          ])}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.3,
          }}
        >
          <div
            className={cn([
              "bg-white rounded-lg text-black p-4 whitespace-pre-wrap",
              {
                "animate-move-x": messagePosition === "right",
                "animate-move-y": messagePosition === "top",
              },
            ])}
          >
            <span dangerouslySetInnerHTML={{ __html: message }}></span>
            <span
              className={cn([
                "absolute rotate-45 bg-white h-4 w-4 transform ",
                {
                  "bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2":
                    messagePosition === "top",
                  "left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2":
                    messagePosition === "right",
                },
              ])}
            ></span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className={styles.Head}>
        <div className={styles.Hat}></div>
        <div className={styles.Hair}></div>
        <div className={styles.Beard}></div>
        <div className={styles.Face}></div>
        <div className={styles.ThiefMask}></div>
        <div className={styles.Eye}></div>
        <div className={styles.Eye}></div>
        <div className={styles.Nose}></div>
      </div>
    </div>
  );
};

Santa.propTypes = {};

export default Santa;
