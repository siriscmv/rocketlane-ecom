import "./App.css";
import CardList from "./components/CardList";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Error from "./components/Error";
import SyncWrapper from "./components/Sync";
import { Provider } from "./utils/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider>
      <SyncWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<CardList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </SyncWrapper>
    </Provider>
  );
}

export default App;
