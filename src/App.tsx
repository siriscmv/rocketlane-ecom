import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Cart from "./components/routes/Cart";
import Error from "./components/routes/Error";
import Order from "./components/routes/Order";
import Shop from "./components/routes/Shop";
import Provider from "./data/store/Provider";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        ß
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
