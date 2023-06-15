import { useState } from 'react';
import './sty/Form.css';
import { json } from 'react-router-dom';

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
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            <br/><input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            { flag ? (
                <div>
                    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <br/><input type="submit" value="Signup"/>
                </div>
            ) : <div>
                    <a className="form-text" href="/">Forgot Password?</a>
                    <br/><input type="submit" value="Login"/>
                </div> }
        </form>
    );
}