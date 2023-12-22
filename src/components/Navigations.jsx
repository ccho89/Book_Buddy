/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from "react";
import bookLogo from "../assets/books.png";
import bookImage from '../assets/bookbuddy.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store";

export const Navigations = () => {
  const user = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    navigate("/");
  };

  const registerAccount = (
    <ul style={{ display: "flex", listStyleType: "none" }}>
      <li style={{ marginRight: 18 }}>
        <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '18px'}}>Login</Link>
      </li>
      <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '18px'}}>Register</Link>
    </ul>
  );

  const signedIn = (
    <ul style={{ display: "flex", listStyleType: "none" }}>
      <li style={{ marginRight: 18 }}>
        <Link to="/account" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '18px'}}>Account</Link>
      </li>
      <li onClick={signout} style={{ cursor: "pointer", fontWeight: 'bold', fontSize: '18px' }}>
        Logout
      </li>
    </ul>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: '1px solid black',
        padding: '15px',
        backgroundImage: `url(${bookImage})`,
        backgroundSize: 'contain',
        opacity: '0.9',
      }}
    >
      <h1>
        <Link to="/" style={{ textDecoration: 'none'}}>
          <img id="logo-image" src={bookLogo} /> Library App
        </Link>
      </h1>
      {user ? signedIn : registerAccount}
    </div>
  );
};