import styles from "./page.module.css";
import { Context } from "../../data/store";
import { useContext } from "react";
import Card from "../Card";

export default function Shop() {
  const { state } = useContext(Context)!;

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
