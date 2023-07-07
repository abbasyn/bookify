import { React, useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/Card";

const HomePage = (props) => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  const imageUrl = firebase.getImageURL;

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  const ImageComponent = () => {
    const [imageUrl, setImageUrl] = useState("");
    console.log("image URLLL", imageUrl);

    useEffect(() => {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(imageUrl); // Replace 'path_to_image' with the actual path to your image in Firebase Storage

      imageRef
        .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log("Error getting download URL:", error);
        });
    }, []);
  };

  return (
    <div className="grid grid-cols-3">
      {books.map((book) => (
        <BookCard
          link={`/books/view/${book.id}`}
          {...book.data()}
          id={book.id}
          key={book.id}
        />
        /* <li>{book.data().bookname}</li>*/
      ))}
    </div>
  );
};

export default HomePage;
