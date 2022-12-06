import React from "react";
import styles from "./Grinch.module.css";

const Grinch = ({
  variant = "default",
}: {
  variant?: "default" | "eyes-closed";
}) => {
  return (
    <div className={styles.Grinch}>
      <div className={styles.GrinchFace}></div>
      <div className={styles.Forehead}></div>
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

Grinch.propTypes = {};

export default Grinch;
