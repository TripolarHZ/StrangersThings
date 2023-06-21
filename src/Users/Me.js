import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessagesFromMe from './MessagesFromMe';
import MessagesToMe from './MessagesToMe';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Me = ({ setPostId, token, user }) => {
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userName, setUsername] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    const myData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const result = await response.json();
        setPosts(result.data.posts);
        setUsername(result.data.username);
        setId(result.data._id);
        setMessages(result.data.messages);
      } catch (err) {
        console.error(err);
      }
    }
    myData();
  }, [])

  const deletePost = async (postIdToDelete) => {
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
      if (result.success === true) {
        const newPosts = posts.filter(post => post._id !== postIdToDelete);
        setPosts(newPosts);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return <>
    <h1 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>Welcome {userName}</h1>
    <p style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>User ID: {id}</p>
    <h2 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>My Posts:</h2>
    {
      posts.map(post => (post.active === true) ? <div key={post._id}>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <h4>Price: {post.price}</h4>
        <h2>Seller: {userName}</h2>
        <h4>Location: {post.location}</h4>
        <Link to='/update' onClick={() => { setPostId(post._id) }} style={{ padding: '14px 28px', backgroundColor: 'blue', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', textDecoration: 'none', marginRight: '20px', width: '100px' }}>Edit</Link>
        <button type="button" className="btn btn-outline-danger" onClick={() => deletePost(post._id)} style={{ padding: '14px 28px', backgroundColor: 'red', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', textDecoration: 'none', width: '100px' }}>Delete</button>
      </div> : <div></div>)
    }
    <MessagesFromMe messages={messages} user={user} />
    <MessagesToMe messages={messages} user={user} />

  </>
}

export default Me;