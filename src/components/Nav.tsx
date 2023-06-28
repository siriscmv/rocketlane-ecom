import { Link, useLocation } from "react-router-dom";
import styles from "./routes/page.module.css";
import { useContext, useEffect } from "react";
import { Context } from "../data/store";
import navStyles from "./nav.module.css";
import CartIcon from "../icons/Cart";
import Logo from "../icons/Logo";

const ROUTES = {
  "/": "Shop Items",
  "/cart": "Your Cart",
  "/order": "Your Order",
  "/error": "Error",
};

export default function Nav() {
  const location = useLocation();
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    if (!state.initialSynced) actions.syncWithBackend();
  }, []);

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo size={64} />
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
