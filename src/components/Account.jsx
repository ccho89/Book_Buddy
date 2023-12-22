/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from '@mui/material'

export const Account = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userSlice);


  const getCheckedBooks = async () => {
    const { data } = await axios.get(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setBooks(data.reservation);
    setLoading(false);
  };

  useEffect(() => {
    console.log('User:', user);
    getCheckedBooks();
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const returnBook = async (book) => {
    console.log(book);
    const url = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${book.id}`;

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await getCheckedBooks();
  };

  return (
    <>
    {user && (
      <p style={{ textAlign: 'center', fontSize: '24px'}}>Welcome {user.name}</p>
    )}
     {books.length > 0 && (
      <p style={{ textAlign: 'center', fontSize: '28px'}}>Checkout your reserved list:</p>
     )}
    {books.length === 0 ? (
      <p style={{ textAlign: 'center', fontSize: '28px'}}>NO BOOKS TO CHECKOUT</p>
    ) : (
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: '20px',
      justifyContent: 'center',
      padding: '12px',
      marginTop: '20px'
      }}
    >
     
      {books.map((book) => (
        <div
          className="book-cards"
          key={book.id}
          style={{
            border: "1px solid black",
              borderRadius: '4px',
              padding: "10px",
              textAlign: 'center',
              background: '#fffafa',
              boxShadow: '5px 10px #dfd3c3',
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{book.title}</p>
          <img
            style={{ width: "100%" }}
            src={book.coverimage}
            alt={`${book.title} image`}
          />
          <Button onClick={() => returnBook(book)}>Return book</Button>
        </div>
      
      ))}
    </div>
     )}
    </>
  );
};



