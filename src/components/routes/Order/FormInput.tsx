import { useState } from "react";
import styles from "./form.module.css";

type ValidationState = null | true | string;

export interface FormInputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  validator: (value: string) => ValidationState;
  useTextArea?: boolean;
}

export default function Input({
  type,
  label,
  validator,
  useTextArea,
}: FormInputProps) {
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState<ValidationState>(null);

  const InputComponent = useTextArea ? "textarea" : "input";

  return (
    <div className={styles.formGroup}>
      <label htmlFor={label}>{`${capitalizeFirstLetter(label)}:`}</label>
      <InputComponent
        type={type}
        id={label}
        name={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setValidation(validator(e.target.value));
        }}
      />
      <span className={styles.errorMessage}>
        {typeof validation === "string" && validation}
      </span>
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
