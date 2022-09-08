import { Component } from 'react';
import './BlogContent.scss';
import posts from '../../shared/projectData'
import { BlogCard } from './components/BlogCard';
import AddPostForm from './components/AddPostForm';

export default class BlogContent extends Component {
    state = {
        showAddForm: false,
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


                {
                    this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide} /> : null
                }




                <>
                    <h1>Simple Blog</h1>

                    <button className='blackBtn' onClick={this.handleAddFormShow}>Создать новый пост</button>

                    <div className="posts">
                        {blogPosts}
                    </div>

                </>



            </ >
        )
    }
}
