import { Link } from "react-router-dom";
import Form from './Form.js';
import temp_logo from '../images/art-icon.png';

export default function Signup({setToken}){
    return (
        <div>
            <div className="main-body">
                <div className="link-box">
                    <img className="temp-logo" src={temp_logo}></img>
                    <h1 className="main-title">Art Application</h1>
                </div>
            </div>
            <div className="Form-box">
                <h1>Sign up to Art App</h1>
                <Form setToken={setToken} flag={true}/>
                <Link to="/login">
                    <button type="login">Back to Login</button>
                </Link>
            </div>
        </div>
    )
}