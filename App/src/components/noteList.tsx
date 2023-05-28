import ReactSelect from "react-select/creatable";
import { useState, useMemo } from "react";
import { Note, noteData, tag } from "../App";
import { Link } from "react-router-dom";

type noteListProps = {
	availableTags: tag[]
  notes: Note[]
};

type displayNotes = {
  tags: tag[]
  title: string
  id: string
}

export function NoteList({ availableTags, notes }: noteListProps) {

	const [selectedTags, setSelectedTags] = useState<tag[]>([]);
  const [title, setTitle] = useState("")


  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title == "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
      (selectedTags.length == 0 || selectedTags.every(tags => note.tags.some(noteTag => noteTag.id === tags.id)))
    })
  }, [title, selectedTags, notes]);

	return (
		<>
			<div className="flex flex-col items-center justify-center mt-40 mb-5 space-y-4">
				<h1 className="text-3xl font-semibold text-center">Search</h1>
				<form className="flex flex-col md:flex-row gap-3" action="">
					<label htmlFor="title" className="mt-4">
						Title
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
					/>

					<label htmlFor="tags" className="mt-4 ml-0 md:ml-4">
						Tags
					</label>
					<ReactSelect
						value={selectedTags.map((tag) => {
							return { label: tag.label, value: tag.id };
						})}
						options={availableTags.map((tag) => {
							return { label: tag.label, value: tag.id };
						})}
						onChange={(tags) => {
							setSelectedTags(
								tags.map((tag) => {
									return { label: tag.label, id: tag.value };
								})
							);
						}}
						isMulti
						className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
					/>
				</form>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-3 items-center mx-12">
				{filteredNotes.map((note: Note) => {
					return (
						<Link to={`/${note.id}`} key={note.id}>
							<NoteCard
								id={note.id}
								title={note.title}
								tags={note.tags}
							/>
						</Link>
					);
				})}
			</div>
		</>
	);
}


function NoteCard({id, title, tags}: displayNotes) {

  return (
		<>
			<div className="mx-auto">
				<div className="border-2 border-teal-100 px-10 py-20 rounded-xl w-auto cursor-pointer hover:shadow-2xl transition-shadow ease-in-out duration-500 h-[35vh]">
					<h1 className="text-center font-semibold text-xl">
						{title}
					</h1>
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
		</>
  );
}