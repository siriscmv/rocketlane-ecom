import { useContext } from "react";
import styles from "./Card.module.css";
import { Context } from "../utils/Context";

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
    return (
      <div className={styles.qty}>
        <button
          onClick={() => {
            actions.incItem(props.id);
          }}
          className={styles.success}
        >
          +
        </button>
        <span>{qty}</span>
        <button
          onClick={() => {
            if (qty === 1) {
              const res = window.confirm("Remove item from cart?");
              if (res) actions.removeFromCart(props.id);
            } else actions.decItem(props.id);
          }}
          className={styles.danger}
        >
          -
        </button>
      </div>
    );
  };

  const AddToCardButton = () => {
    return (
      <button
        onClick={() => {
          actions.addToCart(props.id);
        }}
        className={styles.btn}
      >
        Add to cart
      </button>
    );
  };

  return (
    <div className={styles.main}>
      {props.showRemoveButton && (
        <button
          onClick={() => {
            const res = window.confirm(`Remove ${props.title} from cart?`);
            if (res) actions.removeFromCart(props.id);
          }}
          className={styles.delete}
        >
          X
        </button>
      )}
      <img className={styles.img} src={props.image} alt={props.title} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>{props.title}</span>
          <span>Price: ₹{(props.price * (qty ?? 1)).toFixed(2)}</span>
        </div>
        <span className={styles.description}>{props.description}</span>
        {state.cart.some((c) => c.id === props.id) ? (
          <QuantityController />
        ) : (
          <AddToCardButton />
        )}
      </div>
    </div>
  );
}
