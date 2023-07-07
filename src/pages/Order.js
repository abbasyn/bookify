import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/Card";

const OrderPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase.fetchMyOrders(firebase.user.uid)?.then((items) => {
        console.log({ items });
        setBooks(items?.docs);
      });
  }, [firebase]);
  console.log(books);

  if (!firebase.isLoggedIn) return <h1>Please Log In</h1>;
  console.log({ books });
  return (
    <div>
      {books.map((book) => (
        <BookCard
          link={`/books/order/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
};

export default OrderPage;
