import styles from "./page.module.css";
import Card from "./Card";
import { Context } from "./Context";
import { useContext, useEffect } from "react";

export default function Shop() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    actions.getAllItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {state.items.length === 0 ? (
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
