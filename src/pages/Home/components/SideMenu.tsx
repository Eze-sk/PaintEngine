import { CardWrapper } from "@components/layout/CardWrapper";

interface TypeContent {
	label: string;
	indexUnderline: number;
}

const NAVIGATION_CONTENT: TypeContent[][] = [
	[
		{
			label: "New",
			indexUnderline: 0,
		},
		{
			label: "Community",
			indexUnderline: 0,
		},
		{
			label: "Documentation",
			indexUnderline: 0,
		},
	],
	[
		{
			label: "GitHub",
			indexUnderline: 0,
		},
		{
			label: "Ezesk.dev",
			indexUnderline: 0,
		},
	],
	[
		{
			label: "Preferences",
			indexUnderline: 0,
		},
	],
];

export default function SideMenu() {
	return (
		<CardWrapper
			variant="cream"
			gradientStyle="square"
			className="h-full w-50 p-2 flex flex-col"
			tag="nav"
		>
			{NAVIGATION_CONTENT.map((it, index) => {
				const isLast = NAVIGATION_CONTENT.length - 1 !== index;

				const setBorder = isLast ? "border-shaded-bottom" : "";

				return (
					<ul
						className={`${setBorder} flex flex-col gap-4 py-4`}
						key={it.label}
					>
						{it.map((it) => {
							const label = it.label;
							const index = it.indexUnderline;

							const previousLetters = label.substring(0, index);
							const underlinedLetter = label.charAt(index);
							const letterAfter = label.substring(index + 1);

							return (
								<li key={label} className="flex gap-2 py-1 items-center">
									<div className="w-13 h-13 rounded bg-gray-300 border border-gray-500" />
									<span className="truncate">
										{previousLetters}
										<span className="underline">{underlinedLetter}</span>
										{letterAfter}
									</span>
								</li>
							);
						})}
					</ul>
				);
			})}
		</CardWrapper>
	);
}
