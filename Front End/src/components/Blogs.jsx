import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import style from './blogs.module.css';
import { Link } from 'react-router-dom';

export default function Blogs() {

    const [posts, setPost] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('http://localhost:4000/compose');
                if (response.ok) {
                    const postsData = await response.json();
                    setPost(postsData);
                } else {
                    throw new Error('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                alert('Failed to fetch posts. Please try again later.');
            }
        }

        fetchPosts();
    }, [])


    return (
        <>
            <div className={style.blogsMain}>
                <h1>All Blogs</h1>
                {posts.length > 0 && posts.map(post => (
                    <div className={style.blog}>
                        <div className={style.image}>
                            <Link to={`/post/${post._id}`}>
                                <img src={'http://localhost:4000/' + post.cover} alt="Blog's Pic" />
                            </Link>
                        </div>
                        <div className={style.content}>
                            <div className={style.title}>
                                <Link to={`/post/${post._id}`}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p><i>@{post.author.username}</i>{" "} {format(new Date(post.createdAt), 'MMM dd, yyyy, h:mm a')}</p>
                            </div>
                            <div className={style.summary}>
                                <p>{post.summary}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
