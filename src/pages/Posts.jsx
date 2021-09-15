import './../styles/App.css'
import React, { useEffect, useRef, useState } from 'react';
import PostList from './../components/PostList';
import PostForm from './../components/PostForm';
import PostFilter from './../components/PostFilter';
import Mod from './../components/ui/modal/Mod';
import But from './../components/ui/button/But';
import { usePosts } from './../hooks/usePosts';
import PostService from './../api/PostService';
import Loader from './../components/ui/loader/Loader';
import { useFetch } from './../hooks/useFetch';
import { getPageCount } from './../utils/pages'
import Pagination from './../components/ui/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import Sel from '../components/ui/select/Sel';

function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const changePage = (page) => {
        setPage(page)
    }

    const [fetchPosts, isPostLoading, postError] = useFetch(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [fetchPosts, page, limit])


    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // get a post form child component
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <But style={{ marginTop: 30 }} onClick={() => setModal(true)}>Create</But>
            <Mod visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </Mod>
            <hr />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <Sel
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue='Elements count'
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Vese' },
                ]}
            />
            {
                postError &&
                <h1>{postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List' />
            {
                isPostLoading &&
                <div style={{ display: 'flex', marginTop: 50, justifyContent: 'center' }}>
                    <Loader />
                </div>
            }
            <div ref={lastElement} style={{ height: 20, background: 'red' }} />
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div >
    )
}

export default Posts