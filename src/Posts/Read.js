import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Read = ({posts, setPosts, setPostId,loggedIn,user,token}) => {
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
      if(result.success===true){
        const newPosts = posts.filter(post => post._id !== postIdToDelete);
        setPosts(newPosts);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return <>
    <div className='read'>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
        <h1 style={{ fontSize: '50px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Posts</h1>
        {loggedIn ? <Link to='/create'style={{fontSize:'20px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none', textAlign: 'center', width:'200px'}} >ADD NEW POST</Link> :
        <div></div>} 
      </div>
      {loggedIn ? posts.map(post => (post.author.username===user) ? (<div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
        <Link to='/update' onClick={()=>{setPostId(post._id)}} style={{ padding: '14px 28px', backgroundColor: 'blue', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', textDecoration:'none',marginRight:'20px', width: '100px' }}>Edit</Link>
        <button type="button" className="btn btn-outline-danger" onClick={()=>deletePost(post._id)} style={{ padding: '14px 28px', backgroundColor: 'red', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease',textDecoration:'none', width: '100px'}}>Delete</button>
        </div>): (<div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
        </div>)) : posts.map(post => <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
        </div>)
      }
    </div>
  </>

}

export default Read;