import React, { useState, useContext } from 'react';
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" }); // Reset the form after adding a note
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className='d-flex justify-content-center align-items-start'>
    <div className="container my-3" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className='mb-2 text-center'>Add a Note</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label px-2 py-2">Title</label>
                <input
                    type="text"
                    className="form-control shadow bg-white rounded"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                    minLength={2}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label px-2 py-2">Description</label>
                <input
                    type="text"
                    className="form-control shadow bg-white rounded"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                    minLength={5}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label px-2 py-2">Tag</label>
                <input
                    type="text"
                    className="form-control shadow bg-white rounded"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                />
            </div>
            <div className="d-flex justify-content-center">
                <button
                    disabled={note.title.length < 2 || note.description.length < 5}
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    ADD NOTE
                </button>
            </div>
        </form>
    </div>
</div>

    )
}

export default AddNote;
