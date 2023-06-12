import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    Create,
    Delete,
    Update,
    Read
  } from './Posts';
import{
    Register,
    Login,
    Me,
} from './Users';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

  const App = () =>{

    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const response = await fetch(`${BASE_URL}/posts`)
          
              const result = await response.json();
              setPosts(result.data.posts);
            } catch (err) {
              console.error(err);
            }
          }
          fetchPosts();
    }, []) 

    return <div className = 'app'>
        <h1>Posts</h1>
        {postId ? <Update postId={postId} setPostId={setPostId} /> :  <Create/>}
        {
            posts.map(post => <div key={post._id}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <h4>Price: {post.price}</h4>
                <h2>Seller: {post.author.username}</h2>
                <h4>Location: {post.location}</h4>
                <button type="button" className="btn btn-outline-primary" onClick={()=>setPostId(post._id)} >Edit</button>
                <button type="button" className="btn btn-outline-danger" >Delete</button>
            </div>)
        }
    </div>
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )