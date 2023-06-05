import { useState } from 'react'

export default function Signup(){
    return (
        <div className="Signup-box">
            <h1>Sign up to Art App</h1>
            <form className="Signup">
                <label>
                    <p>Username:</p>
                    <input type="username" />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="password" />
                </label>
                <label>
                    <p>Email:</p>
                    <input type="email" />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}