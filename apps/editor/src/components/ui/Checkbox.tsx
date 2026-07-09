interface TypeProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	className?: string;
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
			<input
				{...props}
				type="checkbox"
				className="sr-only"
				id={id}
				name={id}
			/>
			<span
				className={`${labelSrOnly ? "sr-only" : ""}
				${labelClass ?? ""}`}
			>
				{label}
			</span>
			<span className="checkbox-box" />
		</label>
	);
}
