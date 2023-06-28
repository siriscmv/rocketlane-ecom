import { Link, useLocation } from "react-router-dom";
import styles from "./Page.module.css";
import { Cart, Logo } from "./icons";
import { useContext } from "react";
import { Context } from "./Context";
import navStyles from "./Nav.module.css";

const ROUTES = {
  "/": "Shop Items",
  "/cart": "Your Cart",
  "/invoice": "Your Invoice",
  "/error": "Error",
};

export default function Nav() {
  const location = useLocation();
  const { state } = useContext(Context)!;

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo size={64} />
      </Link>
      <h1>{ROUTES[location.pathname as keyof typeof ROUTES]}</h1>
      <Link to="/cart">
        <div className={navStyles.container}>
          <div className={navStyles.cart}>
            <Cart size={32}></Cart>
            <div className={navStyles.count}>{state.cart.length}</div>
          </div>
        </div>
      </Link>
    </nav>
  );
}
