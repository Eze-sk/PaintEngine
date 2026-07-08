interface TypeProps extends HTMLInputElement {
	className?: string;
	id: string;
	tabindex: string;
	label: string;
	labelSrOnly?: boolean;
	labelClass?: string;
}

export default function Checkbox({
	className,
	id,
	label,
	labelSrOnly = false,
	labelClass,
	...props
}: TypeProps) {
	return (
		<label className={`custom-checkbox ${className ?? ""}`} htmlFor={id}>
			<input type="checkbox" className="sr-only" id={id} name={id} {...props} />
			<span className={`${labelSrOnly ? "sr-only" : ""} ${labelClass ?? ""}`}>
				{label}
			</span>
			<span className="checkbox-box" />
		</label>
	);
}
