import React from 'react';
import "./AddPostForm.scss";
import CancelIcon from '@mui/icons-material/Cancel'

export default function AddPostForm({ handleAddFormHide }) {
    return (
        <form className='addPostForm' action="">
            <div>
                <input className='addPostInput' type="text" name="postTitle" />
            </div>
            <div>
                <textarea className='addPostTextarea' name="postDescription" />
            </div>
            <div>
                <button onClick={handleAddFormHide} className="addPostBtn blackBtn" type="button">Добавить пост</button>
            </div>
            <button className='hideBtn' onClick={handleAddFormHide}>
                <CancelIcon />
            </button>

        </form>
    )
}
