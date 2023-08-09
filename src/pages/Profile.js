import { useState, useEffect } from 'react';
import './sty/Profile.css';

// Displays profile details, stats
export default function Profile({username, setToken}) {
    const [stats, setStats] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username})
        })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            setStats(data);
        })
    }, []);

    const handleLogOut = () => {
        setToken(1);
    }

    return (
        <div className="profile">
            <h2>{username}</h2>
            <div className="stats">
                <div className="email">Email: {stats[0]}</div>
                <div className="created">Created On: {stats[1]}</div>
                <div className="upload_count">Total Uploads: {stats[2]}</div>
                <div className="rating_count">Rating: {stats[3]}</div>
            </div>
            <button className="logout" onClick={handleLogOut}>Log Out</button>
        </div>
    );
}