import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import style from './registration.module.css';
import { userContext } from '../UserContext';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(userContext);

    async function login(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': 'application/json' },
                credentials: 'include'
            });
            // console.log(response);
            if (response.ok) {
                const userInfo = await response.json();
                setUserInfo(userInfo);
                setRedirect(true);
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert("Failed to login. Please try again.");
        }

    }

    if (redirect) {
        return (
            <Navigate to={"/"} />
        )
    }
    return (
        <>
            <div className={style.container}>
                <div className={`${style.login} ${style.form}`}>
                    <header>Login</header>
                    <form action="" onSubmit={login}>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email" />
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password" />
                        {/* <input type="button" value="Log in" className={style.button} onSubmit={response} /> */}
                        <button type='submit' className={style.button}>Login</button>
                    </form>
                    <div className={style.signup}>
                        <div className={style.signup}>Don't have an account?
                            <span><Link to={'/signup'}>Signup</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <form action="" onSubmit={response}>

                    <h1>Login</h1>
                    <label htmlFor="username" >Username</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <br /> <br />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button type='submit'>Submit</button>
                </form>
            </div> */}
        </>
    )
}
