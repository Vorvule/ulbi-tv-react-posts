import React from 'react';
import { useHistory } from 'react-router';
import But from './../components/ui/button/But'

const Postitem = (props) => {

    const router = useHistory()

    return (
        <div className='post'>
            <div className='post__content'>
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className='post__button'>
                <But onClick={() => router.push(`/posts/${props.post.id}`)}>
                    Odcreate
                </But>
                <But onClick={() => props.remove(props.post)}>
                    Udalete
                </But>
            </div>
        </div>
    )
}

export default Postitem