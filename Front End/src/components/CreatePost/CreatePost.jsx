import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from './createPost.module.css';

export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);


  async function createNewPost(e) {

    try {
      e.preventDefault();

      const postData = new FormData();
      postData.set('title', title);
      postData.set('summary', summary);
      postData.set('details', details);
      postData.set('image', image[0]);

      const response = await fetch('http://localhost:4000/compose', {
        method: 'POST',
        body: postData,
        credentials: 'include'
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        alert('Failed to create new post, Try Again');
      }
    } catch (error) {
      console.error('Error creating new post:', error);
      alert('Error Occured! Please try again.');
    }
  }

  if (redirect) {
    return (
      <Navigate to={'/blogs'} />
    )
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <div>
      <div className={style.container}>
        <h1>Create Post</h1>
        <form action="" onSubmit={createNewPost}>
          <input
            type="text"
            placeholder='Enter Post Title'
            value={title}
            onChange={e => setTitle(e.target.value)} required />

          <input
            type="text"
            placeholder='Enter Summary about Post'
            value={summary}
            onChange={e => setSummary(e.target.value)} required />

          <input
            type="file"
            onChange={e => setImage(e.target.files)} required />

          <ReactQuill
            theme="snow"
            value={details}
            onChange={setDetails}
            modules={modules}
            formats={formats} required />

          <button type='submit' className={style.button}>Create Post</button>
        </form>
      </div>
    </div>
  )
}
