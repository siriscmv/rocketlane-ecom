import { useContext, useEffect } from "react";
import { Context } from "../../data/store";
import Card from "../Card";
import styles from "./page.module.css";

export default function Shop() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    if (state.items === null) actions.getAllItems();
    if (state.cart === null) actions.getAllCartItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {state.items === null ? (
          <span>Loading ...</span>
        ) : state.items.length === 0 ? (
          <h3>Shop is empty</h3>
        ) : (
          state.items.map((item) => (
            <Card
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
