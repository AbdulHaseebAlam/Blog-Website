import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from "./singlePost.module.css";

export default function SinglePost() {

    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                return response.json();
            })
            .then(post => {
                setPost(post);
            }).catch(error => {
                console.error('Error fetching post:', error);
                setError('Failed to fetch post. Please try again later.');
            });
    }, [])

    return (
        <>
            {post && (
                <div className={style.mainContainer}>
                    <div className={style.container}>
                        <p>Written By <i><b>@{post.author.username}</b></i></p>
                        <img src={'http://localhost:4000/' + post.cover} alt="Blog's Pic" />
                        <div className={style.content}>
                            <h1>{post.title}</h1>
                            <div className={style.details}>
                                <div dangerouslySetInnerHTML={{ __html: post.details }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
