import { useNote } from "./noteLayout";
import ReactMarkDown from "react-markdown";
import { Link, Navigate } from "react-router-dom";

type NoteProps = {
	DeleteNote: (id: string) => void;
};

export default function Note({ DeleteNote }: NoteProps) {
	const note = useNote();
	const tags = note.tags;

	return (
		<>
			<div className="upper-row m-5 flex justify-between ">
				<div className="flex flex-col">
					<h1 className="text-6xl font-bold">{note.title}</h1>
					<div className="flex gap-2 w-">
						<div className="tags flex flex-wrap gap-1 overflow-auto items-center my-2">
							{tags.map((tag) => (
								<div
									className="bg-teal-600 text-white px-4 py-2 rounded-xl"
									key={tag.id}
								>
									{tag.label}
								</div>
							))}
						</div>
					</div>
				</div>
				{tags.length > 0 && (
					<div className="button flex gap-4 h-min">
						<Link
							to={`/${note.id}/edit`}
							className="bg-teal-600 text-white px-4 py-2 rounded-xl"
						>
							Edit
						</Link>
						<button
							onClick={() => {
								DeleteNote(note.id);
							}}
							className="bg-red-600 text-white px-4 py-2 rounded-xl"
						>
							Delete
						</button>
					</div>
				)}
			</div>
			<ReactMarkDown className="markdown p-10 m-10">
				{note.markdown}
			</ReactMarkDown>
		</>
	);
}
