import React from 'react';
import style from './Mod.module.css'

const Mod = ({ children, visible, setVisible }) => {

    const rootClasses = [style.mod]
    if (visible) {
        rootClasses.push(style.active)
    }

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={() => setVisible(false)}
        >
            <div
                className={style.modContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div >

    )
}

export default Mod