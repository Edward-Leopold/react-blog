import React from 'react';
import "./EditPostForm.scss";
import CancelIcon from '@mui/icons-material/Cancel'

export class EditPostForm extends React.Component {
    state = {
        postTitle: this.props.selectedPost.title,
        postDescription: this.props.selectedPost.description,
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

    editPost = (e) => {
        e.preventDefault();
        const post = {
            id: this.props.selectedPost.id,
            title: this.state.postTitle,
            description: this.state.postDescription,
            liked: this.props.selectedPost.liked,
        }

        this.props.editBlogPost(post);
        this.props.handleEditFormHide();
    }

    render() {
        const handleEditFormHide = this.props.handleEditFormHide;
        return (
            <div className="editPostForm-cover">
                <form className='editPostForm' action="" onSubmit={this.editPost}>
                    <h2 className="editTitle">Редактирование поста</h2>
                    <div>
                        <input
                            placeholder='Введите заголовок поста'
                            className='editPostInput'
                            type="text"
                            name="postTitle"
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder='Введите текст поста'
                            className='editPostTextarea'
                            name="postDescription"
                            value={this.state.postDescription}
                            onChange={this.handlePostDescChange}
                            required
                        />
                    </div>
                    <div>
                        <button
                            className="editPostBtn blackBtn"
                            type="submit"
                        >Сохранить изменение</button>
                    </div>
                    <button className='hideBtn' onClick={handleEditFormHide}>
                        <CancelIcon />
                    </button>
                </form>
            </div>

        )
    }
}
