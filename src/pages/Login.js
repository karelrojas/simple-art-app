import Form from './Form.js';
import temp_logo from '../images/art-icon.png';

export default function Login({setToken}) {
    return (
        <div>
            <div className="main-body">
                    <div className="link-box">
                        <img className="temp-logo" src={temp_logo}></img>
                        <h1 className="main-title">Art Application</h1>
                    </div>
            </div>
            <div className="Form-box">
                <h1>Login to Art App</h1>
                <Form setToken={setToken} flag={false}/>
                <button type="signup">Signup</button>
            </div>
        </div>
    );
}