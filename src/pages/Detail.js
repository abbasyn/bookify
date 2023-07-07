import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);

  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);

  console.log(params);

  useEffect(() => {
    firebase.BookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
  };

  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5 ml-4">
      <h3 className="font-bold m-4">{data.bookname}</h3>
      <img src={url} className=" ml-2 w-[50%] border rounded-xl" />
      <h3 className="font-bold my-2">Details</h3>
      <p>Price: Rs. {data.bookprice}</p>
      <p>ISBN Number: {data.bookcode}</p>
      <h3 className="font-bold my-2">Owners Details</h3>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.UserEmail}</p>

      <div className="flex items-center text-lg mb-6 md:mb-2">
        <input
          type="Number"
          id="qty"
          value={qty}
          className=" mt-2 bg-gray-200 pl-12  md:py-2 focus:outline-none"
          placeholder="Enter Qty"
          onChange={(e) => setQty(e.target.value)}
        />
      </div>

      <button
        onClick={placeOrder}
        variant="success"
        className="bg-green-400 mt-2 rounded font-medium p-2 md:p-2 text-"
      >
        Buy Now
      </button>
    </div>
  );
};

export default BookDetailPage;
