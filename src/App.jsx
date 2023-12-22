import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store'
import { Books } from './components/Books';
import { Navigations } from './components/Navigations'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Account } from './components/Account'
import { SingleBook } from './components/SingleBook'

const getGuestRoute =  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice);

  useEffect(() => {
    const tryToLogin = async () => {
      const token = window.localStorage.getItem("token");
    
      if (token) {
    // so doesn't give server errors if not logged in
        try {
          const response = await axios.get(getGuestRoute, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            dispatch(setUser(response.data));
          } else {
            console.error("Failed to fetch user details:", response);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    tryToLogin();
  }, []);

  return (
    <>
      <Navigations />

      <Routes>
        {user ? (
          <>
            <Route path="/account" element={<Account />} />
          
          {/* To not show path doesn't exist on console */}
            <Route path="/login" element={<></>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
             {/* To not show path doesn't exist on console */}
            <Route path="/account" element={<></>} />
          </>
        )}
        <Route path="/" element={<Books />} />
        <Route path="/books/:bookId" element={<SingleBook />} />
      </Routes>
    </>
  )
  };

export default App