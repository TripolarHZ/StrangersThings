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
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Home from './Home';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDg1MTdlMDBkYWI1ZjAwMTRmNDMwMGYiLCJ1c2VybmFtZSI6IlRyaXBvbGFySFoiLCJpYXQiOjE2ODY0OTI0MzR9.7rQXtP8Nd39yFogmbmpKB-rdA2PbTZB7mp5Ldfa_23w";

const App = () => {
  const [postId, setPostId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');


  return <div className='app'>
    {loggedIn?<Navbar2 setLoggedIn={setLoggedIn}/>:<Navbar1/>}
    <Routes>
    <Route path = "/" element={<Home loggedIn={loggedIn} user={user}/>}></Route>
    <Route path = "/me" element={<Me />}></Route>
    <Route path = "/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser}/>}></Route>
    <Route path = "/register" element={<Register />}></Route>
    <Route path = "/read" element={<Read setPostId={setPostId} loggedIn={loggedIn} user={user}/>}></Route>
    <Route path = "/update" element={<Update postId={postId} setPostId={setPostId}/>}></Route>
    <Route path = "/create" element={<Create />}></Route>
    </Routes>
  </div>
}

ReactDOM.render(
<Router>  
    <App />
</Router>,
  document.getElementById('app')
)