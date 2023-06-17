import {Link} from 'react-router-dom';
import Home from './Home';

export default function Navbar1({setLoggedIn}) {
    return <nav className="nav">
        <h1 className='site-title'>Stranger's Things</h1>
        <ul>
            <li className='active'>
                <Link to='/'>HOME</Link>
            </li>
            <li className='active'>
                <Link to="/read">POSTS</Link>
            </li>
            <li className='active'>
                <Link to='/me'>PROFILE</Link>
            </li>
            <li className='active'>
                <Link to="/login" onClick={()=>setLoggedIn(false)}>LOG OUT</Link>
            </li>
        </ul>
    </nav>
}
