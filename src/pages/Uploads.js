import { useState, useEffect } from 'react';
import './sty/Uploads.css'

// Will update to take in props for img, author, and desc
function Content({user, desc, date}) {
    const splitdate = date.split(" ");
    const newdate = splitdate[2] + " " + splitdate[1] + " " + splitdate[3];
    return (
        <div className="content">
            <img src="https://placehold.co/200?text=Placeholder+Image" alt="Placeholder"/>
            <div className="author">Author: {user}</div>
            <div className="content-desc">{desc}</div>
            <div className="upload-date">{newdate}</div>
        </div>
    );
};

export default function Uploads() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/uploads').then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUsers(data);
        }).catch((err) => {
            console.log(err.message);
        });
    }, []);
    

    return (
        <div>
            <div className="head">
                <h1>Upload Page</h1>
                <h3>This is the page where users can view user uploaded content.</h3>
            </div>
            <div className="upload-body">
                <input className="search-bar" type="text" placeholder="Search...">

                </input>
                <div className="upload-content">
                    {users.map((user) => (
                        <Content user={user[0]} desc={user[1]} date={user[2]} key={user[3]}/>
                    ))}
                      

                </div>
            </div>
        </div>
    );
};