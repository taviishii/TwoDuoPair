// src/components/SignUp.js
import React from 'react';
import './Auth.css';

const SignUp = () => {
    return (
        <div className="auth-container">
            <header className="auth-header">
                <h1>Sign Up for Two Duo Pair</h1>
            </header>
            <main className="auth-content">
                <form className="auth-form">
                    <label>
                        Username:
                        <input type="text" name="username" required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit" className="auth-submit">Sign Up</button>
                </form>
            </main>
        </div>
    );
};

export default SignUp;
