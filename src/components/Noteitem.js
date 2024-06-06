import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3 shadow bg-white rounded" style={{ borderRadius: '25px' }}>
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">{note.title}</h5>
                        <div>
                            <i className="fa-solid fa-trash mx-2 text-danger" style={{ cursor: 'pointer' }} onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>
                            <i className="fa-regular fa-pen-to-square mx-2 text-primary" style={{ cursor: 'pointer' }} onClick={() => { updateNote(note); }}></i>
                        </div>
                    </div>
                    <p className="card-text mt-2">{note.description}</p>
                </div>
            </div>
        </div>

    );
}

Noteitem.propTypes = {
    note: PropTypes.object.isRequired
};

export default Noteitem;
