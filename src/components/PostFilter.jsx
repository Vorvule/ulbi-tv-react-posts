import React from 'react';
import Sel from './ui/select/Sel'
import Inp from './ui/input/Inp'

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <Inp
                value={filter.query}
                placeholder='Search'
                onChange={e => setFilter({ ...filter, query: e.target.value })}
            >

            </Inp>
            <Sel
                defaultValue='Sort By'
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                options={[
                    { value: 'title', name: 'By Name' },
                    { value: 'body', name: 'By Desc' }
                ]}
            />
        </div>

    )
}

export default PostFilter