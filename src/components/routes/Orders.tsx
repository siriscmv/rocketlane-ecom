import { useContext, useEffect } from "react";
import { Context } from "../../data/store";
import orderStyles from "./Order/order.module.css";
import styles from "./page.module.css";

export default function Invoice() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    if (state.orders === null) actions.getAllOrders();
  }, []);

  return (
    <div className={styles.container}>
      <div className={orderStyles.main}>
        <table className={orderStyles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ordered At</th>
              <th>Items</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {state.orders === null ? (
              <span>Loading ...</span>
            ) : state.orders.length === 0 ? (
              <h3>No orders yet :/</h3>
            ) : (
              state.orders.map(({ id, orderedAt, items }) => (
                <tr>
                  <td>{id}</td>
                  <td>{orderedAt}</td>
                  <td>{items.map((i) => i.productItem.title).join(", ")}</td>
                  <td>
                    ₹
                    {items
                      .reduce(
                        (acc, item) =>
                          acc + item.quantity * item.productItem.price,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
