import { useContext } from "react";
import { CardProps } from ".";
import Spinner from "../../icons/Spinner";
import { Context } from "../Context";
import styles from "./card.module.css";

export interface AddButtonProps {
  shouldBlockButton: boolean;
  item: CardProps; //HACK: Not really
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
