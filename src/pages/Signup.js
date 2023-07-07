import Form from './Form.js';
import temp_logo from '../images/art-icon.png';

export default function Signup({username, setUsername, setToken}){
    return (
        <div>
            <div className="main-body">
                <div className="link-box">
                    <img className="temp-logo" alt="logo" src={temp_logo}></img>
                    <h1 className="main-title">Art Application</h1>
                </div>
            </div>
            <div className="Form-box">
                <h2>Sign up to Art App</h2>
                <Form username={username} setUsername={setUsername} setToken={setToken} flag={true}/>
                <a className="form-text" href="/login">Back to Login</a>
            </div>
        </div>
    )
}