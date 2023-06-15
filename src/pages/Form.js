import { useState } from 'react';
import './sty/Form.css';

async function credInput(username, password, email, flag){
    console.log(JSON.stringify({username, password, email}));

    if (flag) {
        let credentials = {username, password, email};
        return fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
    } else {
        let credentials = {username, password};
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
    }
}

export default function Form({setToken, flag}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let token;

    const handleSubmit = async e => {

        e.preventDefault();
        token = await credInput(username, password, email, flag);
        console.log(token);
        if(flag && token === 0) {
            // New account created, redirect to login page
        } else if (token === 0) {
            setToken(parseInt(token));
        }
    }


    return (
        <form className="Login" onSubmit={handleSubmit}>
            { token === 2 ? (
                <div className="form-error">Incorrect username or password</div>
            ) : null }
            <label>
                <p>Username:</p>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                <p>Password:</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            { flag ? (
                <label>
                    <p>Email:</p>
                    <input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
            ) : null }
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}