/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../store'
import { AuthorizationForm } from './AuthorizationForm'

const signInRoute = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login";

const getGuestRoute = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const onSubmit = async (inputs) => {
      try {
     
      const {
        data: { token },
      } = await axios.post(signInRoute, inputs);
     
  
      window.localStorage.setItem("token", token);
  
      const response = await axios.get(getGuestRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      dispatch(setUser(response.data));
      navigate("/account");
    } catch (error) {
      console.error("Login error:", error);
    }
  
  };
  
    return <AuthorizationForm onSubmit={onSubmit} isLoginForm />;
  };