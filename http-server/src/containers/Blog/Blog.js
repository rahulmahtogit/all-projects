import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Posts from './Posts/Posts';
import './Blog.css';
// import axios from 'axios';
// import axios from '../../axios';

// import NewPost from './NewPost/NewPost';

// Lazy Loading for NewPost
import AsyncComponet from '../../hoc/asyncComponet';

// import() loaded in bundle.js when ()=> call  
const AsyncNewPost =  AsyncComponet(() =>{
  return import('./NewPost/NewPost');
});



class Blog extends Component {
  state={
    auth:false
  }

  render() {
   
    return (
      <div>
        <header className="Blog">
          <nav > 
            <ul>
              {/* <a href="/">Home </a>
              <a href="/new-post">  New Post</a> */}
              <NavLink 
              to="/posts/" 
              exact
              activeClassName="active"
              activeStyle={{
                color:'#fa923f',
                textDecoration:'underline'
              }}
              
              
              >Posts</NavLink>
              <NavLink to={{
                pathname:'/new-post',
                hash:'#submit',
                search:'?quick-submit=true'
              }} >  New Post</NavLink>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1> } /> */}
        {/* <Route path="/" exact render={() => <Posts /> } /> */}
        
        <Switch>
        {/* <Route path="/new-post" component={ NewPost} />  */}
        {/* {this.state.auth ? <Route path="/new-post" component={ AsyncComponet} /> : null}  */}
       <Route path="/new-post" component={ AsyncNewPost} />
        <Route path="/posts"  component={ Posts} /> 

        {/* Run from start and execute Not found we didn't found any route or put '/' */}
        {/* <Route render={()=> <h1>404 Not Found</h1> } />  */}
        {/* <Route path="/"  component={ Posts} />  */}
        {/* <Redirect from='/' to='/posts' /> */}

        
        </Switch>
      </div>
    );
  }
}

export default Blog;