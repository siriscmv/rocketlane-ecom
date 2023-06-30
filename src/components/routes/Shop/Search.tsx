import { useState } from "react";
import styles from "./search.module.css";

export default function Search() {
  const [value, setValue] = useState("");

  return (
    <input
      className={styles.input}
      type="text"
      name="search"
      placeholder="Search for products here"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
