import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import './bootstrap.css';
import './style.css';

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const resp = await fetch('')
      }  
    }, [])
    
    return <>
        <h1>
            Posts
        </h1>
    
    </>
}


