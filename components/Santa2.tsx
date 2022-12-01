import React from "react";
import PropTypes from "prop-types";
import styles from "./Santa.module.css";

const Santa = () => {
  return (
    <div className={styles.Santa}>
      <div className={styles.Head}>
        <div className={styles.Hat}></div>
        <div className={styles.Face}>
          <div className={styles.Hair}></div>
          <div className={styles.Eye}></div>
          <div className={styles.Eye}></div>
          <div className={styles.Beard}></div>
          <div className={styles.Nose}></div>
        </div>
      </div>
      <div className={styles.Body}>
        <div className={styles.Arms}>
          <div className={styles.ArmLeft}></div>
          <div className={styles.ArmRight}></div>
        </div>
      </div>
      <div className={styles.Legs}></div>
    </div>
  );
};

Santa.propTypes = {};

export default Santa;
