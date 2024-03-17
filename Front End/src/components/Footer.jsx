import React from 'react';
import style from './footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className={style.footerDistributed}>

                <div className={style.footerRight}>

                    {/* <a href="#" target='blank'><i className="fa-brands fa-facebook-f"></i></a> */}
                    <a href="https://twitter.com/AHaseebNiaxi" target='blank'><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/abdul-haseeb-alam-756052233/" target='blank'><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="https://github.com/AbdulHaseebAlam" target='blank'><i className="fa-brands fa-github"></i></a>

                </div>

                <div className={style.footerLeft}>

                    <p className={style.footerLinks}>
                        <Link className={style.link1} to={'/'}>Home</Link>
                        <Link to={'/blogs'}>Blogs</Link>
                        <Link to={'/about'}>About</Link>
                        <Link to={'/compose'}>Create A Post</Link>
                    </p>

                    <p>Abdul Haseeb Alam &copy; 2024</p>
                </div>

            </footer>
        </>
    )
}
