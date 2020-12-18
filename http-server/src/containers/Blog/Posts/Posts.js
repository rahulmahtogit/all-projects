import React,{ Component} from 'react';
import {Link,Route} from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost'

import './Posts.css';


class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log(this.props)
        axios.get('/posts').then(response => {
            // console.log(response.data.slice(0,5))
            this.setState({ posts: response.data.slice(0,5) })
        }).catch(error => {
            console.log(error)
            // this.setState({ error: true })
        })
    }

    postSelectedHandler = (id) => {
        console.log(this.props)
        // this.props.history.push({pathname: '/posts/' + id})
        this.props.history.push('/posts/' + id)
    }

    render() {
        console.log('[Posts] rendering')
        let posts = <p style={{ textAlign: "center" }}>Something went Wrong!!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                console.log('Map rendering')
                return (
                // <Link to={'/' + post.id} >
                <Post
                 key={post.id}
                    // {...this.props} //Pass all props together
                    title={post.title.slice(0, 3)}
                    author={post.body.slice(0, 3)}
                    clicked={() => { this.postSelectedHandler(post.id) }}
                />
                // </Link>
                );
            })
        }

        return (
            <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url  + '/:id'} exact component={FullPost} /> 

            </div>
        );
    }
}

export default Posts;