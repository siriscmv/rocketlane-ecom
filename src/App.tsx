import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Cart from "./components/routes/Cart";
import Error from "./components/routes/Error";
import Order from "./components/routes/Order";
import Orders from "./components/routes/Orders";
import Shop from "./components/routes/Shop";
import Provider from "./data/store/Provider";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
