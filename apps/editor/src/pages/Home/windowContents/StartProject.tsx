import { db } from "@/db";
import { CardWrapper } from "@components/layout/CardWrapper";
import Checkbox from "@components/ui/Checkbox";
import { ContainerContext } from "@components/ui/WindowManager";
import { projectNameList } from "@consts/projectNameList";
import { useContext, useState } from "react";
import z from "zod";
import slugify from 'slugify';
import { useNavigate } from "react-router";
import type { TypeTab } from "@/types/Metadata";

const NamingScheme = z.string()
	.min(2, "The name must have more than 2 letters")
	.max(100, "The name must not contain more than 100 letters")

const DescriptionScheme = z.string()
	.min(2, "The description must have more than 2 letters")
	.max(255, "The description should not contain more than 255 letters.")
	.optional()
	.or(z.literal(""))

export function Body() {
	const context = useContext(ContainerContext);

	const [randomName] = useState(() => {
		const randomIndex = Math.floor(Math.random() * projectNameList.length);
		return projectNameList[randomIndex];
	});

	const [error, setError] = useState("")

	let navigate = useNavigate();

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		const formData = new FormData(e.currentTarget)
		
		try {
			const name = NamingScheme.parse(formData.get("name"))

			DescriptionScheme.parse(formData.get("description"))

			const slug = slugify(name, {
				replacement: '_',
				lower: true,
				strict: true,
				remove: /[*+~.()'"!:@]/g
			})

			const startTab: TypeTab[] = [{
				tabID: "house-scene",
				title: "house scene",
				icon: "audioEditor"
			}]

			await db.projectMetadata.add({
				name: name,
				slug: slug,
				tabs: startTab,
				createAt: new Date(),
				updatedAt: new Date(),
			})

			navigate(slug)
		} catch (err) {
			if (err instanceof z.ZodError) {
				setError(err.issues[0].message)
			}
		}
	}

	return (
		<form className="flex justify-between flex-col p-2 h-full" onSubmit={onSubmit} >
			<div className="flex flex-col gap-4">
				<label className="flex flex-col gap-1">
					<span className="text-sm">Project Name:</span>
					<input
						type="text"
						id="name"
						name="name"
						placeholder={randomName || "New Game"}
						autoComplete="off"
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
					id="createGithub"
					label="Create GitHub repository"
					labelClass="pl-8.5 text-sm"
				/>
				<Checkbox
					id="privateRepository"
					label="Private Repository"
					labelClass="pl-8.5 text-sm"
				/>
				<span className="text-sm font-semibold text-red-500">{error}</span>
			</div>
			<div
				className="
        border-shaded-top pt-4 flex gap-4 items-center justify-end
        *:rounded *:py-2 *:px-4 *:text-white
        "
			>
				<CardWrapper
					tag="button"
					type="button"
					variant="red"
					shadingStyle="square"
					hasHover
					onClick={context?.toggle}
				>
					Cancel
				</CardWrapper>
				<CardWrapper
					tag="button"
					type="submit"
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
