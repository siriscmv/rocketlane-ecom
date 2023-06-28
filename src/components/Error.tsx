import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Error() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    const msg =
      new window.URL(window.location.href).searchParams.get("msg") ??
      "Something went wrong";
    setErrorMessage(msg);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2 className={styles.danger}>{errorMessage}</h2>
      </div>
    </div>
  );
}
