import React from "react";
import PropTypes from "prop-types";

type Mode = "dark" | "light";

interface AppContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const AppContext = React.createContext<AppContextValue>({
  mode: "dark",
  toggleMode: () => {},
});

export const useAppContext = () => React.useContext(AppContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = React.useState<Mode>("dark");
  React.useEffect(() => {
    if (window) {
      setMode((localStorage.getItem("color-theme") as Mode) || "dark");
    }
  }, []);
  React.useEffect(() => {
    if (window) {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
      if (mode === "light") {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    }
  }, [mode]);
  return (
    <AppContext.Provider
      value={{
        mode,
        toggleMode: () => {
          setMode(mode === "dark" ? "light" : "dark");
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {};

export default AppProvider;
