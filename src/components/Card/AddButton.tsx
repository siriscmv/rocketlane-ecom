import { useContext } from "react";
import Spinner from "../../icons/Spinner";
import { Context } from "../../data/store/";
import styles from "./card.module.css";
import { Item } from "../../data/interfaces";

export interface AddButtonProps {
  shouldBlockButton: boolean;
  item: Item;
}

export function AddButton({ shouldBlockButton, item }: AddButtonProps) {
  const { actions } = useContext(Context)!;

  return (
    <button
      onClick={() => {
        actions.addItemToCart(item);
      }}
      className={`${styles.btn} ${shouldBlockButton && styles.muted}`}
      disabled={shouldBlockButton}
    >
      {shouldBlockButton ? <Spinner size={12} /> : <>Add to cart</>}
    </button>
  );
}
