import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.nav}>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart</Link>
    </div>
  );
}
