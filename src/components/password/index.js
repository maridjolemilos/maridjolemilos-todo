import React from 'react';

const Password = (props) => {
    return (
       <div>  <input type="password" placeholder="password" name="psw" pattern=".{8,}"/> </div>
    )
};

export default Password;
