import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
  Create,
  Update,
  Read
} from './Posts';
import {
  Register,
  Login,
  Me,
} from './Users';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Home from './Home';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');


  return <div className='app'>
    {loggedIn?<Navbar2 setLoggedIn={setLoggedIn}/>:<Navbar1/>}
    <Routes>
    <Route path = "/" element={<Home loggedIn={loggedIn} user={user}/>}></Route>
    <Route path = "/me" element={<Me setPostId={setPostId} token={token} user={user}/>}></Route>
    <Route path = "/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} setToken={setToken}/>}></Route>
    <Route path = "/register" element={<Register />}></Route>
    <Route path = "/read" element={<Read posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} loggedIn={loggedIn} user={user} token={token}/>}></Route>
    <Route path = "/update" element={<Update posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} token={token}/>}></Route>
    <Route path = "/create" element={<Create posts={posts} setPosts={setPosts} token={token}/>}></Route>
    </Routes>
  </div>
}

ReactDOM.render(
<Router>  
    <App />
</Router>,
  document.getElementById('app')
)