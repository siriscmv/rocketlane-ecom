import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../data/store";
import CartIcon from "../icons/Cart";
import Logo from "../icons/Logo";
import navStyles from "./nav.module.css";
import styles from "./routes/page.module.css";

const ROUTES = {
  "/": "Shop Items",
  "/cart": "Your Cart",
  "/order": "Your Order",
  "/error": "Error",
};

export default function Nav() {
  const location = useLocation();
  const { state } = useContext(Context)!;

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <div className={navStyles.container}>
          <Logo size={40} />
        </div>
      </Link>
      <h1>{ROUTES[location.pathname as keyof typeof ROUTES]}</h1>
      <Link to="/cart">
        <div className={navStyles.container}>
          <div className={navStyles.cart}>
            <CartIcon size={32}></CartIcon>
            {state.cart && (
              <div className={navStyles.count}>{state.cart.length}</div>
            )}
          </div>
        </div>
      </Link>
    </nav>
  );
}
