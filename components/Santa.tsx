import React from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Santa.module.css";

const Santa = ({
  variant = "default",
}: {
  variant?: "default" | "eyes-closed";
}) => {
  return (
    <div
      className={cn([
        styles.Santa,
        {
          [styles["Santa--eyes-closed"]]: variant === "eyes-closed",
        },
      ])}
    >
      <div className={styles.Head}>
        <div className={styles.Hat}></div>
        <div className={styles.Hair}></div>
        <div className={styles.Beard}></div>
        <div className={styles.Face}></div>
        <div className={styles.Eye}></div>
        <div className={styles.Eye}></div>
        <div className={styles.Nose}></div>
        <div className={styles.Mouth}></div>
      </div>
    </div>
  );
};

Santa.propTypes = {};

export default Santa;
