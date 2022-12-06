import React from "react";
import cn from "classnames";
import styles from "./Elf.module.css";

const Elf = ({
  variant = "default",
}: {
  variant?: "default" | "eyes-closed";
}) => {
  return (
    <div
      className={cn([
        styles.Elf,
        {
          [styles["Elf--eyes-closed"]]: variant === "eyes-closed",
        },
      ])}
    >
      <div className={styles.Face}>
        <div className={styles.Ear}></div>
        <div className={styles.Ear}></div>
      </div>
      <div className={styles.Forehead}></div>
      <div className={styles.Hair}></div>
      <div className={styles.Hat}></div>
      <div className={styles.Eyes}>
        <div className={styles.Eye}></div>
        <div className={styles.Eye}></div>
        <div className={styles.EyeBrow}></div>
        <div className={styles.EyeBrow}></div>
      </div>
      <div className={styles.Nose}></div>
      <div className={styles.Mouth}></div>
    </div>
  );
};

Elf.propTypes = {};

export default Elf;
