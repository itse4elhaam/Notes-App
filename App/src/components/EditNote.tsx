import NoteForm from "./NoteForm";
import "../index.css";
import { noteData, tag } from "../App";
import { useNote } from "./noteLayout";

export type EditNoteProps = {
	onUpdateNote: (id: string, data: noteData) => void
	onAddTag: (tag: tag) => void
	availableTags: tag[]
}

export default function EditNote({ onUpdateNote, onAddTag, availableTags }: EditNoteProps) {

	const note = useNote();
	return (
		<>
			<NoteForm
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
				onSubmit={data => onUpdateNote(note.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
}
