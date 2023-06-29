import { useContext } from "react";
import { Context } from "../../../data/store";
import styles from "../page.module.css";
import Form from "./Form";
import Invoice from "./Invoice";
import orderStyles from "./order.module.css";

export default function Order() {
  const { state } = useContext(Context)!;

  return (
    <div className={styles.container}>
      <div className={orderStyles.main}>
        <Invoice />
        {(state.cart?.length ?? -1) > 0 && <Form />}
      </div>
    </div>
  );
}
