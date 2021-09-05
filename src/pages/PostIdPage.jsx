import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PostService from '../api/PostService'
import Loader from '../components/ui/loader/Loader'
import { useFetch } from '../hooks/useFetch'

const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading, error] = useFetch(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isCommLoading, commError] = useFetch(async (id) => {
        const response = await PostService.getCommentById(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            {isLoading
                ? <Loader />
                : <div key={post.id}>{post.id}.{post.title}</div>
            }
            {isCommLoading
                ? <Loader />
                : <div>
                    {
                        comments.map(comment =>
                            <div key={comment.id}>
                                <div>{comment.email}</div>
                                <div>{comment.body}</div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default PostIdPage
