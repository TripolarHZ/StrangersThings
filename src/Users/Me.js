import React, { useState, useEffect} from 'react';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Me = ({token}) => {
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [userName, setUsername] = useState([]);
    const [id, setId] = useState([]);

    useEffect(()=>{
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
              setMessages(result.data.messages);
              setUsername(result.data.username);
              setId(result.data._id);
            } catch (err) {
              console.error(err);
            }
        }
        myData();
    }, [])
      
      return <>
      <h1>Welcome {userName}</h1>
      <p>User ID: {id}</p>
      <h2>My Posts:</h2>
      {
            posts.map(post => <div key={post._id}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <h4>Price: {post.price}</h4>
                <h2>Seller: {userName}</h2>
                <h4>Location: {post.location}</h4>
            </div>)
        }
        <h2>Messages to Me:</h2>
        {
            
        }
        
        <h2>Messages from Me:</h2>
        {

        }

      </>
}

export default Me;