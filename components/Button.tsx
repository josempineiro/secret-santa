import React from "react";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
  status?: "default" | "loading" | "success" | "error";
  loading?: boolean;
}

const Button = ({
  kind = "secondary",
  size = "medium",
  type = "button",
  disabled,
  className,
  children,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
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
      <span
        className={cn({
          "opacity-0": loading,
        })}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
    </button>
  );
};

Button.propTypes = {};

export default Button;
