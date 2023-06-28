import { useContext } from "react";
import styles from "./card.module.css";
import { Actions, BackendActions, Context } from "../Context";
import Spinner from "../../icons/Spinner";
import { AddButton } from "./AddButton";
import { QuantityController } from "./QualityController";

export interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  showRemoveButton?: boolean;
}

export function promptAndRemoveItem(
  item: { id: number; title: string },
  removeItemFromCart: Actions["removeItemFromCart"]
) {
  const shoudlRemove = window.confirm(`Remove ${item.title} from cart?`);
  if (shoudlRemove) removeItemFromCart(item.id);
}

export default function Card(props: CardProps) {
  const { state, actions } = useContext(Context)!;
  const quantity = state.cart.find((c) => c.id === props.id)?.quantity ?? null;

  const shouldBlockButton = state.fetching.includes(
    BackendActions.RemoveItemFromCart
  );

  return (
    <div className={styles.main}>
      {props.showRemoveButton && (
        <button
          onClick={() =>
            promptAndRemoveItem(
              { id: props.id, title: props.title },
              actions.removeItemFromCart
            )
          }
          className={`${styles.delete} ${shouldBlockButton && styles.muted}`}
          disabled={shouldBlockButton}
        >
          {shouldBlockButton ? <Spinner size={12} /> : <>X</>}
        </button>
      )}
      <img className={styles.img} src={props.image} alt={props.title} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>
            <b>{props.title}</b>
          </span>
          <span>
            Price: <b>₹{props.price.toFixed(2)}</b>
          </span>
        </div>
        <span className={styles.description}>{props.description}</span>
        {quantity ? (
          <QuantityController
            shouldBlockButton={state.fetching.includes(
              BackendActions.ChangeQtyCartItem
            )}
            id={props.id}
            title={props.title}
            quantity={quantity}
          />
        ) : (
          <AddButton
            shouldBlockButton={state.fetching.includes(
              BackendActions.AddItemToCart
            )}
            item={props}
          />
        )}
      </div>
    </div>
  );
}
