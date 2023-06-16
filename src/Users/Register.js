import React, { useState, } from 'react';


const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Register = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
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
      console.log(result)
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  }

  return <>
    <h1 style={{ fontSize: '32px', color: '#444', textAlign: 'center', marginTop: '40px' }}>Sign Up</h1>
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={registerUser}>
      <input type='text' style={{ padding: '10px', marginBottom: '20px', fontSize: '16px', width: '250px', border: 'none', borderBottom: '2px solid #777', outline: 'none' }} placeholder='Username*' value={username} onChange=
        {(ev) => setUsername(ev.target.value)}></input>
      <input type='password' style={{ padding: '10px', marginBottom: '20px', fontSize: '16px', width: '250px', border: 'none', borderBottom: '2px solid #777', outline: 'none' }} placeholder='Password*' value={password} onChange=
        {(ev) => setPassword(ev.target.value)}></input>
      <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#008080', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }} className="btn btn-outline-primary">SIGN UP</button>
    </form>
  </>
}

export default Register;