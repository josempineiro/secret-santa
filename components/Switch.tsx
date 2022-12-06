import React from "react";
import cn from "classnames";

interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Switch = ({ onChange, className, value, ...rest }: SwitchProps) => {
  return (
    <div className={cn(["flex justify-center", className])}>
      <label className="w-9 bg-dark dark:bg-light bg-opacity-20 dark:bg-opacity-20 rounded-full h-5 p-0.5">
        <input
          className={cn([
            "w-4 rounded-full h-4 block",
            "appearance-none focus:outline-none cursor-pointer shadow-sm",
            "bg-red bg-no-repeat bg-contain bg-santa dark:bg-grinch",
            "transform transition-transform duration-300 ease-in-out",
            {
              "translate-x-full": value,
            },
          ])}
          type="checkbox"
          role="switch"
          onChange={(event) => onChange(event.target.checked)}
          id="flexSwitchCheckDefault"
          checked={value}
          {...rest}
        />
        <span className="w-4 h-4 bg-red" />
      </label>
    </div>
  );
};

Switch.propTypes = {};

export default Switch;
