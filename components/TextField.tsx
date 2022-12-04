import React from "react";
import cn from "classnames";

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  onChange: (value: string) => void;
}

const TextField = ({
  label,
  value,
  onChange,
  className,
  autoFocus,
  ...rest
}: TextInputProps) => {
  const [focused, setFocused] = React.useState<boolean | undefined>(autoFocus);
  const hasValue =
    typeof value === "string" ? value.length > 0 : value !== undefined;

  return (
    <div className={cn([className, "rounded  w-full relative my-2"])}>
      <input
        {...rest}
        id={label}
        className={cn([
          "appearance-none px-4 pt-6 pb-2 text-md font-medium border-none rounded text-white bg-transparent w-full ring-2 ring-white ring-opacity-30 outline-none transition-shadow",
          "focus:ring-2 focus:ring-primary focus:ring-opacity-100",
          "transition-all duration-200",
        ])}
        value={value}
        placeholder=" "
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <label
        htmlFor={label}
        className={cn(
          "text-md ml-4 absolute font-medium top-1/2 left-0 transition-all duration-200 transform -translate-y-1/2 ",
          {
            ["top-1 translate-y-0 font-light text-xs opacity-60"]:
              hasValue || focused,
          }
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default TextField;
