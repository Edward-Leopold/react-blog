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
        isPending: false
    }

    fetchPosts = () => {
        this.setState({
            isPending: true
        })

        axios.get("https://63372a395327df4c43d0f069.mockapi.io/posts")
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

    deletePost = (blogPost) => {
        if (window.confirm(`Удалить ${blogPost.title}?`)) {
            axios.delete(`https://63372a395327df4c43d0f069.mockapi.io/posts/${blogPost.id}`)
                .then((response) => {
                    console.log("Post has been deleted => ", response.data)

                    this.fetchPosts()
                })
                .catch((err) => console.log(err))
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
        axios.post("https://63372a395327df4c43d0f069.mockapi.io/posts/", blogPost)
            .then((response) => {
                console.log("Post has been added =>", response.data);

                this.fetchPosts()
            })
            .catch(err => console.log(err))
        // this.setState((state) => {
        //     const posts = [...state.blogArr];
        //     posts.push(blogPost);
        //     localStorage.setItem('blogPosts', JSON.stringify(posts));
        //     return {
        //         blogArr: posts
        //     }
        // })
    }



    // При маунтинге (первой отрисовке)
    componentDidMount() {
        this.fetchPosts();
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
                    deletePost={() => this.deletePost(item)}
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
                    {
                        this.state.isPending && <h2>Подождите...</h2>
                    }
                    <div className="posts">
                        {blogPosts}
                    </div>

                </>
            </>
        )
    }
}
