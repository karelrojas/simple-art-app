import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sty/Login.css';

async function loginUser(credentials){
    console.log(JSON.stringify(credentials));
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

function Loginform({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let message;
    const handleSubmit = async e => {

        e.preventDefault();
        const token = await loginUser({username,password});
        console.log(token);
        setToken(token);
    }


    return (    
        <form className="Login" onSubmit={handleSubmit}>
            <div className="message">{message}</div>
            <label>
                <p>Username:</p>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                <p>Password:</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}


export default function Login({setToken}) {

    return (
        <div className="Login-box">
            <h1>Login to Art App</h1>
            <Loginform setToken={setToken}/>
            <button type="signup" to="/signup">Signup</button>
        </div>
    );
}