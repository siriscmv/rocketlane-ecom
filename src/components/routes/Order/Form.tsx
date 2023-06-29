import orderStyles from "./order.module.css";

export default function Form() {
  return (
    <>
      {
        //(state.cart?.length ?? -1) > 0 &&
        <form className={orderStyles.form}>
          <input type="text" placeholder="Name" />
          <br />
          <input type="text" placeholder="Address" />
          <br />
          <input type="text" placeholder="Phone" />
          <br />
          <input type="submit" value="Place order" />
        </form>
      }
    </>
  );
}
