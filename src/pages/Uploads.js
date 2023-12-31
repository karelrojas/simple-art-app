import { useState, useEffect } from 'react';
import './sty/Uploads.css'

// Will update to take in props for img, author, and desc
function Content({user, image, desc, date}) {
    const splitdate = date.split(" ");
    const newdate = splitdate[2] + " " + splitdate[1] + " " + splitdate[3];
    return (
        <div className="content">
            <img className="content-image" src={image} alt="Placeholder"/>
            <br/><a className="author" href={`/profile/${user}`}>{user}</a>
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
    
    function handleChange(value) {
        console.log(JSON.stringify({value}))
        fetch('http://localhost:8080/uploads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value})
        })
        .then(res => res.json())
        .then((data => {
            console.log(data);
            setUsers(data);
        }));

    }

    return (
        <div>
            <div className="head">
                <h1>Upload Page</h1>
                <h3>This is the page where users can view user uploaded content.</h3>
            </div>
            <div className="upload-body">
                <label for="sort">Sort by: </label>
                <select className="upload-sort" name="sort" onChange={e => handleChange(e.target.value)}>
                    <option value="date-new">Date (newest)</option>
                    <option value="date-old">Date (oldest)</option>
                    <option value="author">Author</option>
                    <option value="rating">Rating</option>
                </select>
                <input className="search-bar" type="text" placeholder="Search...">

                </input>
                <div className="upload-content">
                    {users.map((user) => (
                        <Content user={user[0]} image={user[1]} desc={user[2]} date={user[3]} key={user[4]}/>
                    ))}
                      

                </div>
            </div>
        </div>
    );
};