import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import formImg from '../assets/formimg.jpg'

const BasicTextFields = ({ onChange, isRegisterForm }) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      style={{backgroundColor: 'white', opacity: '0.8'}}
      id="outlined-basic-email"
       label="Email" 
       variant="outlined"
       name="email"
       onChange={onChange} 
       />
       <TextField 
       style={{backgroundColor: 'white', opacity: '0.8'}}
       id="outlined-basic-password"
       label="Password" 
       variant="outlined"
       name="password"
       onChange={onChange} 
       />
       {isRegisterForm && (
       <TextField 
       style={{backgroundColor: 'white', opacity: '0.8'}}
       id="outlined-basic-name"
       label="Name" 
       variant="outlined"
       name="name"
       onChange={onChange} 
       />
       )}
    </Box>
  );
}

export const AuthorizationForm = ({ onSubmit, isLoginForm }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const onChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(inputs);
  };

  return (
   <>
   <p 
   style={{
    textAlign: "center",
          fontSize: "25px",
          marginTop: "50px",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
}}>
    ENTER YOUR INFO BELOW</p>
    <div style={{
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid black',
      borderRadius: '3px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5rem',
      width: '28rem',
      height: '17rem',
      padding: '1rem',
      backgroundImage: `url(${formImg})`,
      backgroundSize: 'cover',
    }}>
      <BasicTextFields onChange={onChange} isRegisterForm={!isLoginForm}/>
  
      <button 
      style={{
        width: '150px',
        height: '30px',
        marginTop: '10px',
        alignItems: 'center'
      }}
      onClick={onFormSubmit}>
        {isLoginForm ? "Log In" : "Sign Up"}
      </button>
   </div>
   </>
  );
};

