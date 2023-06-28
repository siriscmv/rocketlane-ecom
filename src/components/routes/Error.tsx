import styles from "./page.module.css";

export default function Error() {
  const errorMessage =
    new window.URL(window.location.href).searchParams.get("msg") ??
    "Something went wrong";

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2 className={styles.danger}>{errorMessage}</h2>
      </div>
    </div>
  );
}
