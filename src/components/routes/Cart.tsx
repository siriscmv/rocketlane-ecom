import styles from "./page.module.css";
import Card from "../Card";
import { Context } from "../../data/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import RightChevrons from "../../icons/RightChevrons";

export default function Cart() {
  const { state } = useContext(Context)!;

  return (
    <div className={styles.container}>
      <Link className={styles.linkbtn} to="/invoice">
        <span>Checkout</span>
        <RightChevrons size={36} />
      </Link>
      <div className={styles.main}>
        {state.cart === null ? (
          <span>Loading ...</span>
        ) : state.cart.length === 0 ? (
          <h3>Cart is empty</h3>
        ) : (
          state.cart.map(({ productItem: item }) => (
            <Card
              showRemoveButton
              id={item.id}
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
