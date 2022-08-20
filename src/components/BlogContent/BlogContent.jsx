import { Component } from 'react';
import './BlogContent.scss';
import posts from '../../shared/projectData'
import { BlogCard } from './components/BlogCard';

export default class BlogContent extends Component {
    state = {
        showBlog: true,
        blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
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


    toggleBlog = () => {
        this.setState((state) => {
            return {
                showBlog: !state.showBlog
            }
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


        return (
            <>


                <button onClick={this.toggleBlog}>{
                    this.state.showBlog ? 'Hide blog' : 'Show blog'
                }</button>

                {
                    this.state.showBlog ?
                        <>
                            <h1>Simple Blog</h1>

                            <div className="posts">
                                {blogPosts}
                            </div>

                        </>
                        : null
                }


            </ >
        )
    }
}
