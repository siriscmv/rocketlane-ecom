import styles from "./Page.module.css";
import Card from "./Card";
import { Context } from "../utils/Context";
import { useContext, useEffect } from "react";
import { cart } from "../utils/mockData";
import { Link } from "react-router-dom";

export default function Cart() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    actions.getAllCartItems(cart);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.back} to="/">
          Go Back
        </Link>
        <h1 className={styles.title}>Your Cart</h1>
      </div>
      <div className={styles.main}>
        {state.cart
          .map((c) => {
            if (state.items.length === 0)
              throw new Error("Items not yet loaded, visit /shop");
            return state.items.find((i) => i.id === c.id);
          })
          .map((item, i) =>
            item ? (
              <Card
                showRemoveButton
                id={item.id}
                key={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            ) : (
              <span key={i}>Not found</span>
            )
          )}
      </div>
    </div>
  );
}
