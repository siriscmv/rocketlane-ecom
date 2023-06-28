import { useContext } from "react";
import styles from "./card.module.css";
import { Actions, BackendActions, Context } from "./Context";
import Spinner from "../icons/Spinner";

export interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  showRemoveButton?: boolean;
}

function promptAndRemoveItem(
  item: { id: number; title: string },
  removeItemFromCart: Actions["removeItemFromCart"]
) {
  const shoudlRemove = window.confirm(`Remove ${item.title} from cart?`);
  if (shoudlRemove) removeItemFromCart(item.id);
}

export interface QuantityControllerProps {
  shouldBlockButton: boolean;
  id: CardProps["id"];
  title: CardProps["title"];
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
          actions.changeQtyCartItem({ id, quantity: quantity + 1 });
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
          else actions.changeQtyCartItem({ id, quantity: quantity - 1 });
        }}
        className={shouldBlockButton ? styles.muted : styles.danger}
        disabled={shouldBlockButton}
      >
        {shouldBlockButton ? <Spinner size={12} /> : <>-</>}
      </button>
    </div>
  );
}

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
