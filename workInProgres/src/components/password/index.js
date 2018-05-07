import React from 'react';
import './index.css';

const Password = (props) => {
    return (
       <div>  <input type="password" placeholder="Enter Password" name="psw" pattern=".{8,}"/> </div>
    )
};

export default Password;
