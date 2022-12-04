import React from "react";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
  status?: "default" | "loading" | "success" | "error";
}

const Button = ({
  kind = "secondary",
  size = "medium",
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn([
        className,
        "rounded-md text-white relative",
        {
          "opacity-50 cursor-not-allowed": disabled,
          "bg-primary": kind === "primary",
          "bg-stone-600": kind === "secondary",
          "bg-transparent": kind === "text",
          "p-2": size === "small",
          "p-4": size === "medium",
          "p-6": size === "large",
        },
      ])}
    >
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
