import { useContext } from "react";
import { promptAndRemoveItem } from ".";
import Spinner from "../../icons/Spinner";
import { Context } from "../../data/store";
import styles from "./card.module.css";
import { Item } from "../../data/interfaces";

export interface QuantityControllerProps {
  shouldBlockButton: boolean;
  id: Item["id"];
  title: Item["title"];
  quantity: number;
}

export function QuantityController({
  shouldBlockButton,
  id,
  title,
  quantity,
}: QuantityControllerProps) {
  const { actions } = useContext(Context)!;

  return (
    <div className={styles.qty}>
      <button
        onClick={() => {
          actions.changeQtyCartItem(id, quantity + 1);
        }}
        disabled={shouldBlockButton}
        className={shouldBlockButton ? styles.muted : styles.success}
      >
        {shouldBlockButton ? <Spinner size={12} /> : <>+</>}
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => {
          if (quantity === 1)
            promptAndRemoveItem({ id, title }, actions.removeItemFromCart);
          else actions.changeQtyCartItem(id, quantity - 1);
        }}
        className={shouldBlockButton ? styles.muted : styles.danger}
        disabled={shouldBlockButton}
      >
        {shouldBlockButton ? <Spinner size={12} /> : <>-</>}
      </button>
    </div>
  );
}
