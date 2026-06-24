interface TypeProps {
	label: string;
	className?: string;
}

export default function Checkbox({ label, className }: TypeProps) {
	return (
		<label className={`custom-checkbox ${className}`}>
			<input type="checkbox" className="sr-only" id={`check-${label}`} />
			<span className="sr-only">{label}</span>
			<span className="checkbox-box" />
		</label>
	);
}
