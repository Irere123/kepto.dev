import { cn } from "./utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  loading?: boolean;
  icon?: React.ReactNode;
  disabledTooltip?: string | React.ReactNode;
}

export function Button({
  text,
  variant = "primary",
  loading,
  disabledTooltip,
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.onClick ? "button" : "submit"}
      className={cn(
        "flex h-1 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm focus:outline-none",
        props.disabled || loading
          ? "cursor-not-allowed border-primary-fg border-primary-accent text-gray-400"
          : {
              "border-primary-accent border-primary-fg hover:bg-white hover:text-black":
                variant === "primary",
              "border-gray-200 bg-black text-white hover:bg-white hover:text-black":
                variant === "secondary",
            }
      )}
    >
      <p>{text}</p>
    </button>
  );
}
