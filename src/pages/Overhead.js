import { Outlet, Link } from "react-router-dom";

export default function Overhead() {
    return (
        <div className="link-box">
            <Link to="/home" className="link">Home</Link>
            <Link to="/uploads" className="link">Uploads</Link>
            <Link to="/create" className="link">Create</Link>
            <Link to="/profile" className="link">Profile</Link>

            <Outlet />
        </div>
    );
};