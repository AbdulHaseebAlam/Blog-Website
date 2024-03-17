import React from 'react';
import style from "./about.module.css";
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <>
            <div className={style.mainContainer}>
                <div className={style.container}>
                    <div className={style.image}>
                        <h1>Welcome to <span className={style.eyecatchTitle}>Write-Blog</span></h1>
                    </div>
                    <div className={style.content}>
                        <h1>About <span className={style.eyecatchTitle}>Us</span></h1>
                        <p>Your ultimate destination for creative expression and insightful content. At Write-Blog, we believe in the power of words to inspire, inform, and connect people from all walks of life.</p>
                        <div className={style.aboutUS}>
                            <h1>Our Mission</h1>
                            <p>Our mission at Write-Blog is to provide a platform where writers, bloggers, and content creators can share their thoughts, ideas, and stories with the world. We aim to foster a community of passionate individuals who are dedicated to the art of writing and who seek to make a positive impact through their words.</p>
                        </div>
                        <div className={style.aboutUS}>
                            <p>Write-Blog offers a diverse range of content, covering topics spanning from personal anecdotes to professional insights, from creative fiction to informative articles. Whether you're a seasoned writer or just starting out, Write-Blog welcomes you to join our community and contribute your unique voice to the conversation.
                            </p>
                            <h1>What We Offer</h1>
                        </div>
                        <div className={style.aboutUS}>
                            <h1>Why Choose Write-Blog</h1>
                            <ul>
                                <li><b>Creative Freedom:</b> We believe in giving our writers the creative freedom to express themselves authentically and explore topics that matter to them.</li>
                                <li><b>Engaging Community:</b> Join a vibrant community of writers and readers who share your passion for storytelling and learning.</li>
                                <li><b>Professional Growth:</b> Write-Blog provides opportunities for writers to enhance their skills, build their portfolios, and connect with potential collaborators and clients.</li>
                            </ul>
                        </div>
                        <div className={style.aboutUS}>
                            <div className={style.contactUS}>
                                <p>Have questions or feedback? <br />We'd love to hear from you! Feel free to reach out to us via email or social media. Let's create something extraordinary together.</p>
                                <p>Thank you for choosing Write-Blog. <br /> Together, let's unleash the power of words and inspire the world.</p>
                                <p>Happy writing!</p>
                            </div>
                            <div>
                                <h1>Contact Us</h1>
                                <div className={style.contactIcons}>
                                    <a href="https://github.com/AbdulHaseebAlam" target='blank'><i className="fa-brands fa-github"></i></a>
                                    <a href="https://www.linkedin.com/in/abdul-haseeb-alam-756052233/" target='blank'><i className="fa-brands fa-linkedin-in"></i></a>
                                    <a href="https://twitter.com/AHaseebNiaxi" target='blank'><i className="fa-brands fa-x-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
