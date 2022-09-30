import { Component } from 'react';
import './BlogContent.scss';
import posts from '../../shared/projectData'
import { BlogCard } from './components/BlogCard';
import { AddPostForm } from './components/AddPostForm';
import axios from "axios";

export default class BlogContent extends Component {
    state = {
        showAddForm: false,
        blogArr: [],
    }

    likePost = index => {
        const temp = [...this.state.blogArr];
        temp[index].liked = !temp[index].liked;

        this.setState({
            blogArr: temp
        })

        console.log(temp)
        localStorage.setItem('blogPosts', JSON.stringify(temp))

        this.render()
    }

    deletePost = index => {
        if (window.confirm(`Удалить ${this.state.blogArr[index].title}?`)) {
            const temp = [...this.state.blogArr];
            console.log(index)
            temp.splice(index, 1);

            this.setState({
                blogArr: temp
            })

            localStorage.setItem('blogPosts', JSON.stringify(temp))
        }

    }

    handleAddFormShow = () => {
        this.setState({
            showAddForm: true
        })
    }

    handleAddFormHide = () => {
        this.setState({
            showAddForm: false
        })
    }

    addNewBlogPost = (blogPost) => {

        this.setState((state) => {
            const posts = [...state.blogArr];
            posts.push(blogPost);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            return {
                blogArr: posts
            }
        })
    }

    // При маунтинге (первой отрисовке)
    componentDidMount() {
        axios.get("https://63372a395327df4c43d0f069.mockapi.io/posts")
            .then((response) => {
                this.setState({
                    blogArr: response.data
                })
            })
            .catch((err) => {
                console.log(err.response.status)
            })
    }



    render() {

        const blogPosts = this.state.blogArr.map((item, index) => {
            return (
                <BlogCard
                    title={item.title}
                    description={item.description}
                    key={item.id}
                    liked={item.liked}
                    likePost={() => this.likePost(index)}
                    deletePost={() => this.deletePost(index)}
                />
            )
        })

        if (this.state.blogArr.length == 0) {
            return (
                <h2>Загружаю данные...</h2>
            )
        }

        return (
            <>
                {
                    this.state.showAddForm ? (
                        <AddPostForm
                            blogArr={this.state.blogArr}
                            addNewBlogPost={this.addNewBlogPost}
                            handleAddFormHide={this.handleAddFormHide}
                        />
                    ) : null
                }
                <>
                    <h1>Simple Blog</h1>

                    <button className='blackBtn' onClick={this.handleAddFormShow}>Создать новый пост</button>

                    <div className="posts">
                        {blogPosts}
                    </div>

                </>
            </>
        )
    }
}
