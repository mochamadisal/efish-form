import React from 'react';

const Button = ({type, label, action, customClass}) => {
    return (
        <button onClick={() => action()} className={`btn style-btn font-14 ${type}-btn ${customClass}`}>{label}</button>
    );
};

export default Button;
