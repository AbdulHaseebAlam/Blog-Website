import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./mainContent.module.css"

export default function MainContent() {

    const [posts, setPost] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const posts = await response.json();
                setPost(posts);
            } catch (error) {
                alert('Error fetching data: ' + error);
            }
        };

        fetchData();

    }, [])

    return (
        <div>
            <div className={style.container}>
                <h1>Our Latest <span className={style.eyecatchTitle}>Blogs</span></h1>
                <div className={style.blogs}>
                    {posts.length > 0 && posts.map(post => (
                        <div className={style.mainCard}>
                            <div className={style.image}>
                                <Link to={`/post/${post._id}`}>
                                    <img src={'http://localhost:4000/' + post.cover} alt="Blog's Pic" />
                                </Link>
                            </div>
                            <div className={style.blogInfo}>
                                <Link to={`/post/${post._id}`}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p className={style.truncateText}>{post.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to={'/blogs'}>
                    <button type='submit' className={style.button}>Show more</button>
                </Link>
            </div>
        </div>
    )
}
