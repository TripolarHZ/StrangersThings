import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
  Create,
  Delete,
  Update,
  Read
} from './Posts';
import {
  Register,
  Login,
  Me,
} from './Users';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDg1MTdlMDBkYWI1ZjAwMTRmNDMwMGYiLCJ1c2VybmFtZSI6IlRyaXBvbGFySFoiLCJpYXQiOjE2ODY0OTI0MzR9.7rQXtP8Nd39yFogmbmpKB-rdA2PbTZB7mp5Ldfa_23w";

const App = () => {

  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);

  const handleDelete = async (postIdToDelete) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postIdToDelete}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  const postMessage = async (postIdToMessage) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postIdToMessage}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content: "Do you still have this?  Would you take $10 less?"
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

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

  return <div className='app'>
    {/* <h1>Posts</h1> */}
    {/* <Register /> */}
    <Routes>
    <Route path = "/" element={<Login />}></Route>
    <Route path = "/register" element={<Register />}></Route>
    <Route path = "/read" element={<Read />}></Route>
    </Routes>



    {/* {postId ? <Update postId={postId} setPostId={setPostId} /> : <Create />}
    {
      posts.map(post => <div key={post._id}>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <h4>Price: {post.price}</h4>
        <h2>Seller: {post.author.username}</h2>
        <h4>Location: {post.location}</h4>
        <button type="button" className="btn btn-outline-primary" onClick={() => setPostId(post._id)} >Edit</button>
        <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(post._id)}>Delete</button>
        <button type="button" className="btn btn-outline-primary" onClick={() => postMessage(post._id)} >Message</button>
      </div>)
    } */}
  </div>
}

ReactDOM.render(
<Router>  
    <App />
</Router>,
  document.getElementById('app')
)