import { useContext } from "react";
import styles from "./Card.module.css";
import { BackendActions, Context } from "./Context";
import Spinner from "../icons/Spinner";

export interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  showRemoveButton?: boolean;
}

export default function Card(props: CardProps) {
  const { state, actions } = useContext(Context)!;
  const qty = state.cart.find((c) => c.id === props.id)?.quantity ?? null;

  const QuantityController = () => {
    const disableButton = state.fetching.includes(
      BackendActions.ChangeQtyCartItem
    );

    return (
      <div className={styles.qty}>
        <button
          onClick={() => {
            actions.changeQtyCartItem({ id: props.id, quantity: qty! + 1 });
          }}
          disabled={disableButton}
          className={disableButton ? styles.muted : styles.success}
        >
          {disableButton ? <Spinner size={12} /> : <>+</>}
        </button>
        <span>{qty}</span>
        <button
          onClick={() => {
            if (qty === 1) {
              const res = window.confirm("Remove item from cart?");
              if (res) actions.removeItemFromCart(props.id);
            } else
              actions.changeQtyCartItem({ id: props.id, quantity: qty! - 1 });
          }}
          className={disableButton ? styles.muted : styles.danger}
          disabled={disableButton}
        >
          {disableButton ? <Spinner size={12} /> : <>-</>}
        </button>
      </div>
    );
  };

  const AddToCardButton = () => {
    const disableButton = state.fetching.includes(BackendActions.AddItemToCart);
    return (
      <button
        onClick={() => {
          actions.addItemToCart(props.id);
        }}
        className={`${styles.btn} ${disableButton && styles.muted}`}
        disabled={disableButton}
      >
        {disableButton ? <Spinner size={12} /> : <>Add to cart</>}
      </button>
    );
  };

  const disableButton = state.fetching.includes(
    BackendActions.RemoveItemFromCart
  );

  return (
    <div className={styles.main}>
      {props.showRemoveButton && (
        <button
          onClick={() => {
            const res = window.confirm(`Remove ${props.title} from cart?`);
            if (res) actions.removeItemFromCart(props.id);
          }}
          className={`${styles.delete} ${disableButton && styles.muted}`}
          disabled={disableButton}
        >
          {disableButton ? <Spinner size={12} /> : <>X</>}
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
        {qty ? <QuantityController /> : <AddToCardButton />}
      </div>
    </div>
  );
}
