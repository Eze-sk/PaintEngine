interface TypeProps {
  label: string;
  labelSrOnly?: boolean;
  labelClass?: string;
  className?: string;
}

export default function Checkbox({
  label,
  className,
  labelSrOnly = false,
  labelClass,
}: TypeProps) {
  return (
    <label className={`custom-checkbox ${className ?? ""}`}>
      <input type="checkbox" className="sr-only" id={`check-${label}`} />
      <span className={`${labelSrOnly ? "sr-only" : ""} ${labelClass ?? ""}`}>
        {label}
      </span>
      <span className="checkbox-box" />
    </label>
  );
}
