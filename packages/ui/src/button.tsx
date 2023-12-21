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
  icon,
  disabledTooltip,
  ...props
}: ButtonProps) {
  return (
    <button
      // if onClick is passed, it's a "button" type, otherwise it's being used in a form, hence "submit"
      type={props.onClick ? "button" : "submit"}
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none",
        props.disabled || loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          : {
              "border-primary-fg bg-primary-accents-8 text-white hover:bg-white hover:text-black":
                variant === "primary",
              "border-primary-accents-2 bg-primary-accents-1 text-primary-accents-8 focus:border-primary-accents-2 hover:border-black hover:text-black":
                variant === "secondary",
              "border-blue-500 bg-success text-white hover:bg-white hover:text-blue-500":
                variant === "success",
              "border-error bg-error text-primary-accents-8 hover:bg-white hover:text-red-500":
                variant === "danger",
            },
        props.className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? <p>loading..</p> : icon ? icon : null}
      <p>{text}</p>
    </button>
  );
}
