import React, { useState } from 'react';
import style from './registration.module.css';
import { Link, Navigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function register(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-type': 'application/json' }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            } else {
                alert('Account Created Successfully');
                setRedirect(true);
            }
        } catch (error) {
            alert(error);
        }

    }

    if (redirect) {
        return (
            <Navigate to={"/login"} />
        )
    }

    return (
        <div className={style.container}>
            <div className={`${style.registeration} ${style.form}`}>
                <header>Signup</header>
                <form action="" onSubmit={register}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Confirm your password" />
                    <button type='submit' className={style.button}>Signup</button>
                    {/* <input type="button" className={"button"} value="Signup" /> */}
                </form>
                <div className={style.signup}>
                    <div className={style.signup}>Already have an account?
                        <span><Link to={'/login'}>login</Link></span>
                    </div>
                </div>
            </div>
            {/* <form action="" onSubmit={register}>

                <h1>Sign up</h1>
                <label htmlFor="username" >Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <br /> <br />
                <label htmlFor="email" >Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <br /> <br />
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit'>Submit</button>
            </form> */}
        </div>
    )
}
