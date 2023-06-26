import "./App.css";
import CardList from "./components/CardList";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { Provider } from "./utils/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<CardList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
