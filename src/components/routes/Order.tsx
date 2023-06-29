import { useContext } from "react";
import { Context } from "../../data/store";
import orderStyles from "./order.module.css";
import styles from "./page.module.css";

export default function Order() {
  const { state } = useContext(Context)!;

  const total =
    state.cart
      ?.map((i) => i.quantity * i.productItem.price)
      ?.reduce((acc, curr) => acc + curr, 0) ?? 0;

  return (
    <div className={styles.container}>
      <div className={orderStyles.main}>
        <table className={orderStyles.table}>
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
            {state.cart === null ? (
              <span>Loading ...</span>
            ) : state.cart.length === 0 ? (
              <h3>Cart is empty</h3>
            ) : (
              state.cart.map(({ productItem: item, quantity }) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{quantity}</td>
                  <td>₹{(item.price * quantity).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <h3>Total amount: ₹{total}</h3>
        {(state.cart?.length ?? -1) > 0 && (
          <form className={orderStyles.form}>
            <input type="text" placeholder="Name" />
            <br />
            <input type="text" placeholder="Address" />
            <br />
            <input type="text" placeholder="Phone" />
            <br />
            <input type="submit" value="Place order" />
          </form>
        )}
      </div>
    </div>
  );
}
