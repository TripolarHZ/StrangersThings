import {Link} from 'react-router-dom';
import Home from './Home';

export default function Navbar1() {
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
                <Link to="/login">LOG IN</Link>
            </li>
        </ul>
    </nav>
}
