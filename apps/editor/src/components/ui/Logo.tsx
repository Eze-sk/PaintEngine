export default function Logo() {
	return (
		<div className="flex items-end gap-2">
			<img src="/logo.webp" alt="Paint Engine logo" width={30} height={30} />
			<h1 className="text-white text-[14px] font-bold pb-1">Paint Engine</h1>
		</div>
	);
}
