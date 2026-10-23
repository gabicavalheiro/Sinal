import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    icon?: ReactNode;
  }
>(function Button(
  { variant = "primary", className = "", icon, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={`button button--${variant} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
});

export function Tag({
  children,
  variant = "neutral",
}: {
  children: ReactNode;
  variant?: "neutral" | "green" | "orange";
}) {
  return <span className={`tag tag--${variant}`}>{children}</span>;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="toggle-field">
      <span>
        <span className="toggle-label">{label}</span>
        {description && <small>{description}</small>}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="toggle" aria-hidden="true" />
    </label>
  );
}
