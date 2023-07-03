import { useContext, useEffect } from "react";
import { Context } from "../../../data/store";
import styles from "../page.module.css";
import Form from "./Form";
import Invoice from "./Invoice";
import orderStyles from "./order.module.css";

export default function Order() {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    if (state.cart === null) actions.getAllCartItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={orderStyles.main}>
        <Invoice />
        {(state.cart?.length ?? -1) > 0 && <Form />}
      </div>
    </div>
  );
}
