import React from 'react';
import "./AddPostForm.scss";
import CancelIcon from '@mui/icons-material/Cancel'

export class AddPostForm extends React.Component {
    state = {
        postTitle: '',
        postDescription: '',
    }

    handlePostTitleChange = (e) => {
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostDescChange = (e) => {
        this.setState({
            postDescription: e.target.value
        })
    }

    render() {
        const handleAddFormHide = this.props.handleAddFormHide;
        return (
            <form className='addPostForm' action="">
                <div>
                    <input
                        className='addPostInput'
                        type="text"
                        name="postTitle"
                        value={this.state.postTitle}
                        onChange={this.handlePostTitleChange}
                    />
                </div>
                <div>
                    <textarea
                        className='addPostTextarea'
                        name="postDescription"
                        value={this.state.postDescription}
                        onChange={this.handlePostDescChange}
                    />
                </div>
                <div>
                    <button
                        onClick={handleAddFormHide}
                        className="addPostBtn blackBtn"
                        type="button"
                    >Добавить пост</button>
                </div>
                <button className='hideBtn' onClick={handleAddFormHide}>
                    <CancelIcon />
                </button>

            </form>
        )
    }
}
