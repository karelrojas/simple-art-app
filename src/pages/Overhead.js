import { Outlet, Link } from "react-router-dom";
import temp_logo from '../images/art-icon.png';

export default function Overhead({username}) {
    return (
        <div className="main-body">
            <div className="link-box">
                <img className="temp-logo" src={temp_logo}></img>
                <Link to="/home" title="Home" className="home-link">
                    <h1 className="main-title">Art Application</h1>
                </Link>
                <Link to="/uploads" title="Uploads Page" className="link">Uploads</Link>
                <Link to="/create" title="Create" className="link">Create</Link>
                <Link to={`/profile/${username}`} title="Profile" className="link">{username}</Link>
            </div>
            <Outlet />
        </div>
    );
};