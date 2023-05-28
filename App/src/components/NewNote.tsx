import NoteForm from "./NoteForm";
import "../index.css";
import { noteData, tag } from "../App";

export type newNoteProps = {
	onSubmit: (data: noteData) => void
	onAddTag: (tag: tag) => void
	availableTags: tag[]
}

export default function NewNote({ onSubmit, onAddTag, availableTags }: newNoteProps) {
	return (
		<>
			<NoteForm
				onSubmit={onSubmit}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
}
