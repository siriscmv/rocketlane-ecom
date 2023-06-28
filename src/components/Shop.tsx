import styles from "./Page.module.css";
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
        {state.items.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
