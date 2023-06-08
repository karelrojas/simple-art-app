import { Outlet, Link } from "react-router-dom";
import temp_logo from '../images/art-icon.png';

export default function Overhead() {
    return (
        <div className="main-body">
            <div className="link-box">
                <img className="temp-logo" src={temp_logo}></img>
                <h1 className="main-title">Art Application</h1>
                <Link to="/home" className="link">Home</Link>
                <Link to="/uploads" className="link">Uploads</Link>
                <Link to="/create" className="link">Create</Link>
                <Link to="/profile" className="link">Profile</Link>
            </div>
            <Outlet />
        </div>
    );
};