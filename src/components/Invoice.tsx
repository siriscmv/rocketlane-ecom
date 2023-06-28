import styles from "./page.module.css";
import invoiceStyles from "./invoice.module.css";
import { Context } from "./Context";
import { useContext, useEffect } from "react";

export default function Invoice() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    actions.getAllCartItems();
  }, []);

  const total = state.cart
    .map((i) => i.quantity * i.productItem.price)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={styles.container}>
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
            {state.cart.map(({ productItem: item, quantity }) => (
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
