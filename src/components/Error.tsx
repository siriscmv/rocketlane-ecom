import { useEffect, useState } from "react";
import styles from "./Home.module.css";

export default function Error() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setErrorMessage(window.location.search);
  }, []);

  return (
    <div className={styles.main}>
      <h6>{errorMessage}</h6>
    </div>
  );
}
