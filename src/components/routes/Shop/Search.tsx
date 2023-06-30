import { useContext, useState } from "react";
import { Context } from "../../../data/store";
import styles from "./search.module.css";

export default function Search() {
  const { actions } = useContext(Context)!;
  const [value, setValue] = useState("");

  return (
    <input
      className={styles.input}
      type="text"
      name="search"
      placeholder="Search for products here"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);

        if (!e.target.value) actions.clearSearchedItems();
        else actions.searchItems(e.target.value);
      }}
    />
  );
}
