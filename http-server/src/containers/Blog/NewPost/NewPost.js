import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

import './NewPost.css';
import axios from 'axios';
class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted:false
    }
    componentDidMount(){
        // unAuth ? this.props.history.replace('/posts') :null
        console.log(this.props)
    }
    
    postDataHandler = ()=>{
        const post = {
            title: this.state.title,
        content: this.state.content,
        author: this.state.author
        }
        axios.post('/posts',post).then(response =>{
            // console.log(response)
            // this.setState({submitted:true}) // First way to redirect to posts
            // this.props.history.push('/posts') // Push the page on current stack,back by back button 
            this.props.history.replace('/posts') // replace the page can't back by back button
        }).catch(error => {
            console.log(error)
        })
    }

    render () {
        // console.log('[New Post] rendering')
        let redirect = null;
        if(this.state.submitted){
            redirect = <Redirect to="posts" />
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;