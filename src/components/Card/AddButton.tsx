import { useContext } from "react";
import { Item } from "../../data/interfaces";
import { Context } from "../../data/store/";
import Spinner from "../../icons/Spinner";
import styles from "./card.module.css";

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
