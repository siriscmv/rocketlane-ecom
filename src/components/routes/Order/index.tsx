import styles from "../page.module.css";
import Form from "./Form";
import Invoice from "./Invoice";
import orderStyles from "./order.module.css";

export default function Order() {
  return (
    <div className={styles.container}>
      <div className={orderStyles.main}>
        <Invoice />
        <Form />
      </div>
    </div>
  );
}
