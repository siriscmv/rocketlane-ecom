import "./App.css";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Error from "./components/Error";
import Invoice from "./components/Invoice";
import SyncWrapper from "./components/Sync";
import { Provider } from "./utils/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <Provider>
      <SyncWrapper>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </SyncWrapper>
    </Provider>
  );
}

export default App;
//TODO: Make /shop the default component, and have a navbar. Cart icon in navbar should show number of items
