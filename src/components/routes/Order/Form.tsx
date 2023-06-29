import confetti from "canvas-confetti";
import { MouseEvent, useContext, useState } from "react";
import { Actions, BackendActions, Context } from "../../../data/store";
import Spinner from "../../../icons/Spinner";
import styles from "./form.module.css";

type ValidationState = null | true | string;

interface Validation {
  name: ValidationState;
  phone: ValidationState;
  address: ValidationState;
}

interface Details {
  name: string;
  phone: string;
  address: string;
}

export default function Form() {
  const { actions, state } = useContext(Context)!;
  const [details, setDetails] = useState<Details>({
    name: "",
    phone: "",
    address: "",
  });
  const [validation, setValidation] = useState<Validation>({
    name: null,
    phone: null,
    address: null,
  });

  const isLoading = state.fetching.includes(BackendActions.PlaceOrder);
  const hasPendingErrors = !Object.values(validation).every((v) => v === true);

  return (
    <form className={styles.orderForm}>
      <h2>Your details</h2>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={details.name}
          onChange={(e) => {
            setDetails((details) => ({ ...details, name: e.target.value }));
            setValidation((val) => ({
              ...val,
              name: validateName(e.target.value),
            }));
          }}
        />
        <span className={styles.errorMessage}>
          {typeof validation.name === "string" && validation.name}
        </span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={details.phone}
          onChange={(e) => {
            setDetails((details) => ({ ...details, phone: e.target.value }));
            setValidation((val) => ({
              ...val,
              phone: validatePhone(e.target.value),
            }));
          }}
        />
        <span className={styles.errorMessage}>
          {typeof validation.phone === "string" && validation.phone}
        </span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={details.address}
          onChange={(e) => {
            setDetails((details) => ({ ...details, address: e.target.value }));
            setValidation((val) => ({
              ...val,
              address: validateAddress(e.target.value),
            }));
          }}
        />
        <span className={styles.errorMessage}>
          {typeof validation.address === "string" && validation.address}
        </span>
      </div>
      <button
        disabled={hasPendingErrors || isLoading}
        type="submit"
        className={`${styles.submitButton} ${
          hasPendingErrors && styles.disabled
        }`}
        onClick={(e) => handleSubmit(e, actions, details)}
      >
        {isLoading ? <Spinner size={12} /> : "Place order"}
      </button>
    </form>
  );
}

async function handleSubmit(
  event: MouseEvent,
  actions: Actions,
  details: Details
) {
  event.preventDefault();
  await actions.placeOrder(details);

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  await actions.clearCart();
  window.location.href = "/orders";
}

/*
    For validation,
    null means no validation has been done yet
    true means validation passed
    string means validation failed with the string being the error message
*/

function validateName(name: string) {
  if (name.length === 0) return null;
  const trimmed = name.trim();

  if (trimmed.length === 0) return "Name cannot be empty";
  if (trimmed.length < 3) return "Name must be at least 3 characters long";
  if (trimmed.length > 50) return "Name cannot be longer than 50 characters";

  const NAME_PATTERN = /^[a-zA-Z]+$/; // only alphabets
  if (!NAME_PATTERN.test(trimmed)) return "Name can only contain alphabets";

  return true;
}

function validatePhone(phone: string) {
  if (phone.length === 0) return null;
  const trimmed = phone.trim();

  if (trimmed.length === 0) return "Phone cannot be empty";
  if (trimmed.length !== 10) return "Phone must be 10 characters long";

  const PHONE_PATTERN = /^[0-9]+$/; // only numbers
  if (!PHONE_PATTERN.test(trimmed)) return "Phone can only contain numbers";

  return true;
}

function validateAddress(address: string) {
  if (address.length === 0) return null;
  const trimmed = address.trim();

  if (trimmed.length === 0) return "Address cannot be empty";
  if (trimmed.length < 10) return "Address must be at least 10 characters long";
  if (trimmed.length > 200)
    return "Address cannot be longer than 200 characters";

  return true;
}
