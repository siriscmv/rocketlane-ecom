import { useContext } from "react";
import { Context } from "../../../data/store";
import orderStyles from "./order.module.css";

export default function Invoice() {
  const { state } = useContext(Context)!;

  const total = (
    state.cart
      ?.map((i) => i.quantity * i.productItem.price)
      ?.reduce((acc, curr) => acc + curr, 0) ?? 0
  ).toFixed(2);

  return (
    <>
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
            <tr>
              <td colSpan={5}>Loading ...</td>
            </tr>
          ) : state.cart.length === 0 ? (
            <tr>
              <td colSpan={5}>Cart is empty</td>
            </tr>
          ) : (
            state.cart.map(({ productItem: item, quantity }) => (
              <tr key={item.id}>
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
    </>
  );
}
