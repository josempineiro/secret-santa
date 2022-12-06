import React, { useEffect } from "react";
import Switch from "components/Switch";
import { useAppContext } from "context/AppContext";

const ModeSwitcher = () => {
  const { mode, toggleMode } = useAppContext();
  return (
    <>
      <Switch
        value={mode === "dark"}
        onChange={(value) => {
          toggleMode();
        }}
      />
      <div className="absolute top-1/2 -left-4 left-1/2 -translate-x-full -translate-y-1/2">
        <svg
          className="w-6 h-6 animate-move-x fill-dark dark:fill-light stroke-dark dark:stroke-light"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </>
  );
};

ModeSwitcher.propTypes = {};

export default ModeSwitcher;
