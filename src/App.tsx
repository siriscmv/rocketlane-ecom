import "./App.css";
import Shop from "./components/routes/Shop";
import Cart from "./components/routes/Cart";
import Error from "./components/routes/Error";
import Order from "./components/routes/Order";
import Provider from "./data/store/Provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
