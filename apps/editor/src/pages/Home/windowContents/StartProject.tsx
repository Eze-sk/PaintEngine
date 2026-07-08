import { CardWrapper } from "@components/layout/CardWrapper";
import Checkbox from "@components/ui/Checkbox";
import { projectNameList } from "@consts/projectNameList";
import { useState } from "react";

export function Body() {
	const [randomName] = useState(() => {
		const randomIndex = Math.floor(Math.random() * projectNameList.length);
		return projectNameList[randomIndex];
	});

	return (
		<form className="flex justify-between flex-col p-2 h-full">
			<div className="flex flex-col gap-4">
				<label className="flex flex-col gap-1">
					<span className="text-sm">Project Name:</span>
					<input
						type="text"
						id="projectName"
						name="projectName"
						placeholder={randomName || "New Game"}
						className="bg-white border border-gray-500 w-full p-2 rounded"
					/>
				</label>
				<label htmlFor="description" className="flex flex-col gap-1">
					<span className="text-sm">
						Description:
						<span className="font-extralight text-gray-400"> (optional)</span>
					</span>
					<textarea
						className="w-full bg-white border border-gray-500 p-2 rounded"
						name="description"
						id="description"
					></textarea>
				</label>
				<Checkbox
					id="create-github"
					label="Create GitHub repository"
					labelClass="pl-8.5 text-sm"
				/>
				<Checkbox
					id="private-repository"
					label="Private Repository"
					labelClass="pl-8.5 text-sm"
				/>
			</div>
			<div
				className="
        border-shaded-top pt-4 flex gap-4 items-center justify-end
        *:rounded *:py-2 *:px-4 *:text-white
        "
			>
				<CardWrapper tag="button" variant="red" shadingStyle="square" hasHover>
					Cancel
				</CardWrapper>
				<CardWrapper
					tag="button"
					variant="glass"
					shadingStyle="square"
					hasHover
				>
					Create
				</CardWrapper>
			</div>
		</form>
	);
}
