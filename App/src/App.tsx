import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./components/noteList";
import NewNote from "./components/NewNote";
import NavBar from "./components/NavBar";
import Note from "./components/Note";
import { NoteLayout } from "./components/noteLayout";
import EditNote from "./components/EditNote";

export type Note = {
	id: string;
} & noteData;

export type noteData = {
	title: string;
	markdown: string;
	tags: tag[];
};

export type tag = {
	id: string;
	label: string;
};

export type RawNote = {
	id: string;
} & RawNoteData;

export type RawNoteData = {
	title: string;
	markdown: string;
	tagIds: string[];
};

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<tag[]>("TAGS", []);

	// we're adding tags to each note
	// we're doing that by checking which tag has the same id as the note, if same then we add them
	// we're using memo to optimize this, because its a quite expensive operation
	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			};
		});
	}, [notes, tags]);

	function onNoteCreation({ tags, ...data }: noteData) {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			];
		});
	}

	function addTag(tags: tag) {
		setTags((prev) => [...prev, tags]);
	}

	function onUpdateNote(id: string, { tags, ...data }: noteData) {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === id) {
					return {
						...note,
						...data,
						tagIds: tags.map((tag) => tag.id),
					};
				} else {
					return note;
				}
			});
		});
	}

	function onDeleteNote(id: string) {
		setNotes((prevNotes) => {
			return prevNotes.filter((note) => note.id !== id);
		});
	}

	return (
		<>
			<NavBar />
			<Routes>
				<Route
					path="/"
					element={
						<NoteList availableTags={tags} notes={notesWithTags} />
					}
				/>
				<Route
					path="/new"
					element={
						<NewNote
							onSubmit={onNoteCreation}
							onAddTag={addTag}
							availableTags={tags}
						/>
					}
				/>
				<Route
					path="/:id"
					element={<NoteLayout notes={notesWithTags} />}
				>
					<Route index element={<Note DeleteNote={onDeleteNote} />} />
					<Route
						path="edit"
						element={
							<EditNote
								onUpdateNote={onUpdateNote}
								onAddTag={addTag}
								availableTags={tags}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to={"/"} />} />
			</Routes>
		</>
	);
}

export default App;
