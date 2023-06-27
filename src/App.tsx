import "./App.css";
import CardList from "./components/CardList";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Error from "./components/Error";
import { Context, Provider } from "./utils/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";

function App() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    if (!state.initialSynced) actions.syncWithBackend();
  }, []);

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<CardList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
