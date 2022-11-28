import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./TextField.module.css";

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  onChange: (value: string) => void;
}

const TextField = ({ label, value, onChange, ...rest }: TextInputProps) => {
  return (
    <div className={styles.TextField}>
      <input
        {...rest}
        id={label}
        className={styles.TextFieldInput}
        value={value}
        placeholder=" "
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <label htmlFor={label} className={styles.TextFieldLabel}>
        {label}
      </label>
    </div>
  );
};

export default TextField;
