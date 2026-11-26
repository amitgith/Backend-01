import { Eye, EyeOff } from "lucide-react";

export function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  visible,
  onToggleVisible,
}) {
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;

  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-[13px] font-medium text-ink">{label}</span>
      <span className="relative block">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-[50px] w-full rounded-xl border border-border bg-surface px-4 pr-12 text-sm text-ink outline-none transition placeholder:text-muted/70 hover:border-border-hover focus:border-accent focus:ring-4 focus:ring-accent/10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={onToggleVisible}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted transition hover:text-ink"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </span>
    </label>
  );
}
