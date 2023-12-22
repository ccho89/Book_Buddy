/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

export const SingleBook = () => {
  const { bookId } = useParams();
  const user = useSelector((state) => state.userSlice);
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`
        );
        setBook(data.book);
        console.log(data);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    getBookDetails();
  }, [bookId]); // include bookId in dependency array to refetch when changes

  // allows user to add book from book details page to account list
  const handleCheckout = async () => {
    const url = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`;
    try {
      await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/account");
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <p
        style={{
          fontSize: "22px",
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "25px",
        }}
      >
        BOOK SUMMARY
      </p>
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          background: "#fffafa",
          transform: "translate(-50%, -50%)",
          boxShadow: "5px 10px #dfd3c3",
        }}
      >
        {book ? (
          <Card sx={{ maxWidth: 600 }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <img
                src={book.coverimage}
                alt={book.title}
                style={{
                  width: "240px",
                }}
              />
              <div
                style={{
                  width: "250px",
                }}
              >
                <Typography variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{ fontStyle: "italic" }}
                >
                  {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginTop: "8px" }}
                >
                  {book.description}
                </Typography>
              </div>
            </CardContent>
            
              <CardActions>
                <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '350px'
                }}
                >
                <Button
                  size="small"
                  onClick={handleGoBack}
                  style={{marginLeft: '10px'}}
                >
                  Go Back
                </Button>
                {user && (
                <Button
                  size="small"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                )}
                </div>
              </CardActions>
            
          </Card>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </div>
    </>
  );
};