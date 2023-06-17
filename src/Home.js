import {Link} from 'react-router-dom';

export default function Home({loggedIn,user}){

    return <div className="home">
        {loggedIn?<div>
            <h1>Welcome to Stranger's Things</h1>
            <h2>Logged in as {user}</h2>
            <Link to='/me'>VIEW PROFILE</Link>
           </div> : <div>
           <h1>Welcome to Stranger's Things</h1>
           <h2>Please Login!</h2>
            <Link to='/login'>LOG IN</Link>
            </div>}
    </div>
}