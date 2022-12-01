import React from "react";
import styles from "./Santa.module.css";

const Santa = () => {
  return (
    <div className={styles.Santa}>
      <div className={styles.Head}>
        <div className={styles.Hat}></div>
        <div className={styles.Hair}></div>
        <div className={styles.Beard}></div>
        <div className={styles.Face}></div>
        <div className={styles.Eye}></div>
        <div className={styles.Eye}></div>
        <div className={styles.Nose}></div>
      </div>
    </div>
  );
};

Santa.propTypes = {};

export default Santa;
