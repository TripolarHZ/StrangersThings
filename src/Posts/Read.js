import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Read = ({posts, setPosts, postId, setPostId,loggedIn,user,token}) => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(false);

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

  const postMessage = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      });
      const result = await response.json();
      console.log(result);
      setPostId(null);
      setMessage('');
      setSelected(false);
    } catch (err) {
      console.error(err);
    }
  }

  return <>
    <div className='read'>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
        <h1 style={{ fontSize: '50px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Posts</h1>
        <form>
        <input type='text' placeholder='Search a post' value={search} onChange=
            {(ev) => setSearch(ev.target.value)} style={{width:'500px',height:'30px', border: 'none', borderBottom: '1px solid blue', outline: 'none', marginBottom:'30px', fontSize:'20px'}}></input>
        </form>
        {loggedIn ? <Link to='/create'style={{fontSize:'20px',color:'white',padding:'10px',backgroundColor:'coral',borderRadius:'10px',textDecoration:'none', textAlign: 'center', width:'200px', marginBottom:"40px"}} >ADD NEW POST</Link> :
        <div></div>} 
      </div>
      {loggedIn ? posts.filter((post)=>{
        return search.toLowerCase() === '' ? post : post.title.toLowerCase().includes(search);
      }).map(post => (post.author.username===user) ? (<div className='posts' key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4 className='price'>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
        <Link to='/update' onClick={()=>{setPostId(post._id)}} style={{ padding: '14px 28px', backgroundColor: 'blue', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', textDecoration:'none',marginRight:'20px', width: '100px' }}>Edit</Link>
        <button type="button" className="btn btn-outline-danger" onClick={()=>deletePost(post._id)} style={{ padding: '14px 28px', backgroundColor: 'red', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease',textDecoration:'none', width: '100px'}}>Delete</button>
        </div>): (<div className='posts' key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4 className='price'>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
          {selected && (post._id === postId) ? <form onSubmit={postMessage}>
            <input type='text' placeholder='Send a message' value={message} onChange=
            {(ev) => setMessage(ev.target.value)} onClick={()=>setPostId(post._id)} style={{width:'500px',height:'30px', border: 'none', borderBottom: '1px solid blue', outline: 'none'}}></input>
            <button type='submit' style={{ padding: '10px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '15px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease',textDecoration:'none',marginLeft:'20px' }} className="btn btn-outline-primary">SEND</button>
          </form> : <button type="button" className="btn btn-outline-danger" onClick={()=>{setSelected(true); setPostId(post._id)}} style={{ padding: '14px 28px', backgroundColor: 'Orange', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease',textDecoration:'none', width: '150px'}}>Message</button>}
        </div>)) : posts.filter((post)=>{
        return search.toLowerCase() === '' ? post : post.title.toLowerCase().includes(search);
      }).map(post => <div className='posts' key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <h4 className='price'>Price: {post.price}</h4>
          <h2>Seller: {post.author.username}</h2>
          <h4>Location: {post.location}</h4>
        </div>)
      }
    </div>
  </>

}

export default Read;