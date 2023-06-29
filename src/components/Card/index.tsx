import { useContext } from "react";
import { Item } from "../../data/interfaces";
import { Actions, BackendActions, Context } from "../../data/store";
import Spinner from "../../icons/Spinner";
import { AddButton } from "./AddButton";
import { QuantityController } from "./QualityController";
import styles from "./card.module.css";

export interface CardProps extends Item {
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
  const { id, showRemoveButton, title, image, price, description } = props;
  const quantity = state.cart?.find((c) => c.id === id)?.quantity ?? null;

  const shouldBlockButton = state.fetching.includes(
    BackendActions.RemoveItemFromCart
  );
  return (
    <div className={styles.main}>
      {showRemoveButton && (
        <button
          onClick={() =>
            promptAndRemoveItem(
              { id: id, title: title },
              actions.removeItemFromCart
            )
          }
          className={`${styles.delete} ${shouldBlockButton && styles.muted}`}
          disabled={shouldBlockButton}
        >
          {shouldBlockButton ? <Spinner size={12} /> : <>X</>}
        </button>
      )}
      <img className={styles.img} src={image} alt={title} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>
            <b>{title}</b>
          </span>
          <span>
            Price: <b>₹{price.toFixed(2)}</b>
          </span>
        </div>
        <span className={styles.description}>{description}</span>
        {quantity ? (
          <QuantityController
            shouldBlockButton={state.fetching.includes(
              BackendActions.ChangeQtyCartItem
            )}
            id={id}
            title={title}
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
