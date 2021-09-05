import React from 'react';
import classes from './Inp.module.css';

const Inp = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.inp} {...props} />
    )
})

export default Inp