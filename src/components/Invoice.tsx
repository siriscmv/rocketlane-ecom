import styles from "./Page.module.css";
import Card from "./Card";
import { Context } from "../utils/Context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Invoice() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    actions.getAllCartItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.back} to="/">
          Go Back
        </Link>
        <h1 className={styles.title}>Your Invoice</h1>
      </div>
      <div className={styles.main}>
        {state.cart
          .map((c) => state.items.find((i) => i.id === c.id))
          .map((item, i) =>
            item ? (
              <Card //TODO Make a table here and display cart details here
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
