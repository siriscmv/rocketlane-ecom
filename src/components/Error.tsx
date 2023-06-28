import { useEffect, useState } from "react";
import styles from "./Page.module.css";

export default function Error() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setErrorMessage(window.location.search);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>{errorMessage}</h2>
      </div>
    </div>
  );
}
