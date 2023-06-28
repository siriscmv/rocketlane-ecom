import "./App.css";
import Shop from "./components/routes/Shop";
import Cart from "./components/routes/Cart";
import Error from "./components/routes/Error";
import Invoice from "./components/routes/Invoice";
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
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
