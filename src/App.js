import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import Listing from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrderPage from "./pages/Order";
import ViewOrderDetails from "./pages/ViewOrderDetail";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books/listing" element={<Listing />} />
        <Route path="/books/view/:bookId" element={<BookDetailPage />} />
        <Route path="/books/orders" element={<OrderPage />} />
        <Route path="/books/order/:bookId" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
