import { useLocation } from "react-router-dom";
import styles from "./Page.module.css";

const ROUTES = {
  "/": "Shop Items",
  "/cart": "Your Cart",
  "/invoice": "Your Invoice",
  "/error": "Error",
};

export default function Nav() {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <h2>{ROUTES[location.pathname as keyof typeof ROUTES]}</h2>
    </nav>
  );
}
