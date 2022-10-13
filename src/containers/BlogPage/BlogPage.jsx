import { Component } from 'react';
import './BlogPage.scss';
import { BlogCard } from './components/BlogCard';
import { AddPostForm } from './components/AddPostForm';
import { EditPostForm } from './components/EditPostForm';
import axios from "axios";
import { CircularProgress } from '@mui/material';
import { postsUrl } from '../../shared/projectData';

export default class BlogPage extends Component {
    state = {
        showAddForm: false,
        showEditForm: false,
        blogArr: [],
        isPending: false,
        selectedPost: {}
    }

    fetchPosts = (pending = false) => {
        if (pending) {
            this.setState({
                isPending: true
            });
        }


        axios.get(postsUrl)
            .then((response) => {
                this.setState({
                    blogArr: response.data,
                    isPending: false
                })
            })
            .catch((err) => {
                console.log(err.response.status)
            })
    }

    // При маунтинге (первой отрисовке)
    componentDidMount() {
        this.fetchPosts();
    }

    likePost = blogPost => {
        const temp = { ...blogPost };
        temp.liked = !temp.liked;

        axios.put(`${postsUrl}${blogPost.id}`, temp)
            .then((response) => {
                console.log("Post has been liked => ", response.data)

                this.fetchPosts()
            })
            .catch((err) => console.log(err))
    }
    // Удаление Поста
    deletePost = (blogPost) => {
        if (window.confirm(`Удалить ${blogPost.title}?`)) {
            axios.delete(`${postsUrl}${blogPost.id}`)
                .then((response) => {
                    console.log("Post has been deleted => ", response.data)

                    this.fetchPosts(true)
                })
                .catch((err) => console.log(err))
        }
    }

    // Редактирование поста
    // показываем форму редактирвания
    handleEditFormShow = () => {
        this.setState({
            showEditForm: true
        })
    }
    // скрываем форму редактирования
    handleEditFormHide = () => {
        this.setState({
            showEditForm: false
        })
    }
    // Следим за выбранным постом для редактирования в состоянии BlogContent
    handleSelectPost = (blogPost) => {
        this.setState({
            selectedPost: blogPost
        })
    }
    // показываем форму ДОбавления поста
    handleAddFormShow = () => {
        this.setState({
            showAddForm: true
        })
    }
    // скрываем форму добавления поста
    handleAddFormHide = () => {
        this.setState({
            showAddForm: false
        })
    }

    // функция добавления нового поста
    addNewBlogPost = (blogPost) => {
        axios.post(`${postsUrl}`, blogPost)
            .then((response) => {
                console.log("Post has been added =>", response.data);

                this.fetchPosts(true)
            })
            .catch(err => console.log(err))
    }

    // Функция редактирования поста
    editBlogPost = (editedPost) => {
        axios.put(`${postsUrl}${editedPost.id}`, editedPost)
            .then((response) => {
                console.log("Post has been edited =>", response.data);

                this.fetchPosts(true)
            })
            .catch(err => console.log(err))
    }







    render() {
        //console.log(this.state.selectedPost)
        const blogPosts = this.state.blogArr.map((item) => {
            return (
                <BlogCard
                    title={item.title}
                    description={item.description}
                    key={item.id}
                    liked={item.liked}
                    likePost={() => this.likePost(item)}
                    deletePost={() => this.deletePost(item)}
                    handleEditFormShow={this.handleEditFormShow}
                    handleSelectPost={() => this.handleSelectPost(item)}
                />
            )
        })

        if (this.state.blogArr.length === 0) {
            return (
                <h2>Загружаю данные...</h2>
            )
        }

        return (
            <div className='blog-content'>
                {
                    this.state.showAddForm ? (
                        <AddPostForm
                            blogArr={this.state.blogArr}
                            addNewBlogPost={this.addNewBlogPost}
                            handleAddFormHide={this.handleAddFormHide}
                        />
                    ) : null
                }

                {
                    this.state.showEditForm ? (
                        <EditPostForm
                            handleEditFormHide={this.handleEditFormHide}
                            selectedPost={this.state.selectedPost}
                            editBlogPost={this.editBlogPost}
                        />
                    ) : null
                }
                <>
                    <h1>Simple Blog</h1>

                    <button className='blackBtn' onClick={this.handleAddFormShow}>Создать новый пост</button>
                    {
                        this.state.isPending && <CircularProgress className='circle' />
                    }
                    <div className="posts">
                        {blogPosts}
                    </div>

                </>
            </div>
        )
    }
}