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

    createPost = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.postTitle,
            description: this.state.postDescription,
            liked: false,
        }

        this.props.addNewBlogPost(post);
        this.props.handleAddFormHide();
    }

    render() {
        const handleAddFormHide = this.props.handleAddFormHide;
        return (
            <form className='addPostForm' action="" onSubmit={this.createPost}>
                <div>
                    <input
                        className='addPostInput'
                        type="text"
                        name="postTitle"
                        value={this.state.postTitle}
                        onChange={this.handlePostTitleChange}
                        required
                    />
                </div>
                <div>
                    <textarea
                        className='addPostTextarea'
                        name="postDescription"
                        value={this.state.postDescription}
                        onChange={this.handlePostDescChange}
                        required
                    />
                </div>
                <div>
                    <button
                        className="addPostBtn blackBtn"
                        type="submit"
                    >Добавить пост</button>
                </div>
                <button className='hideBtn' onClick={handleAddFormHide}>
                    <CancelIcon />
                </button>

            </form>
        )
    }
}
