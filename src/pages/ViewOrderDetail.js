import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [orders, setOders] = useState([]);

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOders(orders.docs));
  }, []);

  //console.log(params);

  return (
    <div>
      <h1 className="font-bold m-2 mb-2">View Orders Details</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div className="m-2 boder border-2 p-3" key={order.id}>
            <h4 className="font-bold">Order By: {data.displayName}</h4>
            <h5>Qty: {data.qty}</h5>
            <h5>Email: {data.UserEmail}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrderDetails;
