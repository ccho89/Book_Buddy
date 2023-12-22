/* TODO - add your code to create a functional React component that renders a registration form */

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthorizationForm } from "./AuthorizationForm";

import { setUser } from "../store";

const signUpRoute =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register";

const getGuestRoute =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (inputs) => {
    try {
  
    const {
      data: { token },
    } = await axios.post(signUpRoute, inputs);

    window.localStorage.setItem("token", token);

  
    const response = await axios.get(getGuestRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUser(response.data));
 
    navigate("/account");
  } catch (error) {
    console.error("Registration error:", error);
  }};

  return <AuthorizationForm onSubmit={onSubmit} />

  };

 
