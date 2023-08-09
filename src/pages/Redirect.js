import temp_logo from '../images/art-icon.png';

export default function Redirect() {

    return (
        <>
            <div className="main-body">
                    <div className="link-box">
                        <img className="temp-logo" alt="logo" src={temp_logo}></img>
                        <h1 className="main-title">Art Application</h1>
                    </div>
            </div>
            <meta http-equiv="refresh" content="3;url=http://localhost:3000" />
            <div className="redirect-msg">Account created, returning to login page</div>
        </>
    )
}