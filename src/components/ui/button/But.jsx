import React from 'react';
import classes from './But.module.css'

const But = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.btn}>
            {children}
        </button>
    )
}

export default But