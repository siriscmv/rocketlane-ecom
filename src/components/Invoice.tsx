import styles from "./Page.module.css";
import invoiceStyles from "./Invoice.module.css";
import { Context } from "../utils/Context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Invoice() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    actions.getAllCartItems();
  }, []);

  const total = state.cart
    .map((i) => i.quantity * state.items.find((it) => it.id === i.id)!.price)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.back} to="/">
          Go Back
        </Link>
        <h1 className={styles.title}>Your Invoice</h1>
      </div>
      <div className={invoiceStyles.main}>
        <table className={invoiceStyles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {state.cart
              .map((c) => ({
                item: state.items.find((i) => i.id === c.id)!,
                quantity: c.quantity,
              }))
              .map(({ item, quantity }) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{quantity}</td>
                  <td>₹{(item.price * quantity).toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h3>Total amount: ₹{total}</h3>
      </div>
    </div>
  );
}
