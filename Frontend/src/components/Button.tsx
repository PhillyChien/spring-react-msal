import clsx from "clsx";
import { MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

export default function Button({
  children,
  className,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center h-18 px-3 py-2 rounded-3xl  border-gray-300 border",
        className,
        disabled ? "cursor-not-allowed" : ""
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
