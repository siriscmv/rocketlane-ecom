import styles from "./Page.module.css";
import Card from "./Card";
import { Context } from "./Context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import RightChevrons from "../icons/RightChevrons";

export default function Cart() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    actions.getAllCartItems();
  }, []);

  return (
    <div className={styles.container}>
      <Link className={styles.linkbtn} to="/invoice">
        <span>Checkout</span>
        <RightChevrons size={36} />
      </Link>
      <div className={styles.main}>
        {state.cart
          .map((c) => state.items.find((i) => i.id === c.id))
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
