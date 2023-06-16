import React, { useState, } from 'react';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      });
      const result = await response.json();
      console.log(result);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  }

  return <>
    <div className="loginContainer">
      <h1 style={{ fontSize: '28px', textAlign: 'center', marginTop: '40px' }}>Log In</h1>
      <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type='text' placeholder='Username*' value={username} onChange=
          {(ev) => setUsername(ev.target.value)} style={{ padding: '8px', marginBottom: '10px', fontSize: '16px', width: '200px' }}></input>
        <input type='password' placeholder='Password*' value={password} onChange=
          {(ev) => setPassword(ev.target.value)} style={{ padding: '8px', marginBottom: '10px', fontSize: '16px', width: '200px' }}></input>
        <button type="submit" className="btn btn-outline-primary" style={{ padding: '10px', backgroundColor: '#4CAF50', border: 'none', color: '#fff', cursor: 'pointer' }}>LOG IN</button>
      </form>
    </div>
  </>
}

export default Login;