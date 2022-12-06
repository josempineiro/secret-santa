import React, { useEffect } from "react";
import Switch from "components/Switch";
import { useAppContext } from "context/AppContext";

const ModeSwitcher = () => {
  const { mode, toggleMode } = useAppContext();
  return (
    <Switch
      value={mode === "dark"}
      onChange={(value) => {
        toggleMode();
      }}
    />
  );
};

ModeSwitcher.propTypes = {};

export default ModeSwitcher;
