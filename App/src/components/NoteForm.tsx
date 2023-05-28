import { FormEvent, useRef, useState } from "react";
import "../index.css";
import CreatableReactSelect from "react-select/creatable";
import { tag, noteData} from "../App"
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

export type NoteFormProps = {
	onSubmit: (data: noteData) => void;
	onAddTag: (tag: tag) => void;
	availableTags: tag[];
} & Partial<noteData>

export default function NoteForm({onSubmit, onAddTag, availableTags, title = "", markdown = "", tags=[]}: NoteFormProps) {
	const navigate = useNavigate()
	const titleRef = useRef<HTMLInputElement>(null);
	const mdRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<tag[]>(tags);


	const handleSubmit = (e:FormEvent) => {
		e.preventDefault();
		onSubmit({
			title: titleRef.current!.value,
			markdown: mdRef.current!.value,
			tags: selectedTags,
		});
		navigate(".."); 
	};

	return (
		<div className="bg-teal-500 p-8 rounded-lg mx-auto my-24 w-10/12">
			<h2 className="text-2xl text-white mb-6 font-bold">New Note</h2>

			<form onSubmit={handleSubmit}>
				<div className="flex justify-center items-center space-x-10 w-full">
					<div className="w-1/2">
						<label htmlFor="title" className="text-white">
							Title:
						</label>
						<input
							type="text"
							id="title"
							defaultValue={title}
							ref={titleRef}
							className="w-full bg-white text-black rounded-lg px-4 py-2"
						/>
					</div>

					<div className="w-1/2">
						<label htmlFor="title" className="text-white">
							Tags:
						</label>
						<CreatableReactSelect
							isMulti
							onCreateOption={(label) => {
								const newTag = { id: uuidV4(), label };
								onAddTag(newTag);
								setSelectedTags((prev) => [...prev, newTag]);
							}}
							value={selectedTags.map((tag) => {
								return { label: tag.label, value: tag.id };
							})}
							// making sure we're putting it in the correct format
							options={availableTags.map((tag) => {
								return { label: tag.label, value: tag.id };
							})}
							onChange={(tags) => {
								setSelectedTags(
									tags.map((tag) => {
										return {
											label: tag.label,
											id: tag.value,
										};
									})
								);
							}}
							className="text-black rounded-lg px-4 py-2"
						/>
					</div>
				</div>

				<div className="my-8">
					<label htmlFor="markdown" className="text-white">
						Body:
					</label>
					<textarea
						id="markdown"
						defaultValue={markdown}
						className="w-full bg-white text-black rounnded-lg px-4 py-2"
						rows={8}
						ref={mdRef}
					></textarea>
				</div>

				<button
					type="submit"
					className="bg-teal-700 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-out"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
