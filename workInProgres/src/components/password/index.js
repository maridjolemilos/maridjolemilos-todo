import React from 'react';
import './style.css';

const Password = (props) => {
    return (
       <div>  <input type="password" placeholder="Enter Password" name="psw" pattern=".{8,}"/> </div>
    )
};

export default Password;
