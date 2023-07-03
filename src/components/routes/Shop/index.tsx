import { useContext, useEffect } from "react";
import { Context } from "../../../data/store";
import Card from "../../Card";
import styles from "../page.module.css";
import Search from "./Search";

export default function Shop() {
  const { state, actions } = useContext(Context)!;

  useEffect(() => {
    if (state.items === null) actions.getAllItems();
    if (state.cart === null) actions.getAllCartItems();
  }, []);

  const items =
    state.searchedItems !== null ? state.searchedItems : state.items;

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.main}>
        {items === null ? (
          <span>Loading ...</span>
        ) : items.length === 0 ? (
          <h3>No results :/</h3>
        ) : (
          items.map((item) => (
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
