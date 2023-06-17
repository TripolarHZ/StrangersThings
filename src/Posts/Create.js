import React, { useState, } from 'react';
import {Navigate} from 'react-router-dom';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


const Create = ({posts, setPosts,token}) => {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pressed, setPressed] = useState(false);

  const makePost = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            location: (location === "") ? "[On Request]" : location,
            willDeliver: willDeliver
          }
        })
      });
      const result = await response.json();
      console.log(result);
      setPressed(true);
      if(result.success===true) {
        setSuccess(true);
        setPosts([result.data.post,...posts]);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
      }
      else{
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return <>
    <div className='create'>
      <h1 style={{ fontSize: '32px', color: '#333', textAlign: 'center', marginTop: '40px'}}>Add New Post</h1>
      <form onSubmit={makePost}>
        <input type='text' placeholder='Title*' value={title} onChange=
          {(ev) => setTitle(ev.target.value)}></input>
        <input type='text' placeholder='Description*' value={description} onChange=
          {(ev) => setDescription(ev.target.value)}></input>
        <input type='text' placeholder='Price*' value={price} onChange=
          {(ev) => setPrice(ev.target.value)}></input>
        <input type='text' placeholder='Location' value={location} onChange=
          {(ev) => setLocation(ev.target.value)}></input>
        <input type='checkbox' className='deliver'/><label style={{ fontSize: '16px' }}>Willing to Deliver?</label>
        <button type='submit' style={{ padding: '14px 28px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease', marginTop:'50px',textDecoration:'none' }} className="btn btn-outline-primary">CREATE</button>
      </form>
      {pressed ? (success ? <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
      <p style={{fontSize:'25px',color:'white'}}>You have successfully created the post!</p>
      <Navigate replace to='/read' />
      </div> : <div style={{padding: '30px',backgroundColor:'blue',marginTop:'30px',borderRadius:'30px',textAlign:'center'}}>
      <p style={{fontSize:'25px',color:'white'}}>Creating this post is unsuccessful, please try again!</p>
      </div>) : <p></p>}
    </div>
  </>
}

export default Create;