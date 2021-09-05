import React from 'react';
import { useState } from "react";
import But from './../components/ui/button/But';
import Inp from './../components/ui/input/Inp';

const PostForm = ({ create }) => {

    const [post, setPost] = useState({ title: '', body: '' })

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({ title: '', body: '' })
    }

    return (
        <form>
            <Inp
                type='text'
                placeholder='Name'
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
            />
            <Inp
                type='text'
                placeholder='Desc'
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
            />
            <But onClick={addNewPost}>Post It</But>
        </form>
    )
}

export default PostForm