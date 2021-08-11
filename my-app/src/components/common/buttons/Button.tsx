import React from 'react';
import s from './Button.module.css';

type PropsType = {
    buttonName: string
}
const Button: React.FC<PropsType> = ({ buttonName }) => {
    return (
        <button className={s.button} >{buttonName}</button>
    )
}

export default Button;