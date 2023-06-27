import styles from "./Page.module.css";
import Card from "./Card";
import { Context } from "../utils/Context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Shop() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    actions.getAllItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.back} to="/">
          Go Back
        </Link>
        <h1 className={styles.title}>List of available products</h1>
      </div>
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
