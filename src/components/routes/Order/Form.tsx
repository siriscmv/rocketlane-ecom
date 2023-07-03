import confetti from "canvas-confetti";
import { FormEvent, RefObject, useContext, useRef } from "react";
import { Actions, BackendActions, Context } from "../../../data/store";
import Spinner from "../../../icons/Spinner";
import FormInput from "./FormInput";
import styles from "./form.module.css";
import { validateAddress, validateName, validatePhone } from "./validators";

const VALIDATORS = {
  name: validateName,
  phone: validatePhone,
  address: validateAddress,
} as const;

export default function Form() {
  const { actions, state } = useContext(Context)!;
  const formRef = useRef<HTMLFormElement>(null);
  const isLoading = state.fetching.includes(BackendActions.PlaceOrder);

  return (
    <form
      noValidate
      onSubmit={(e) => handleSubmit(e, actions, formRef)}
      className={styles.orderForm}
      ref={formRef}
    >
      <h2>Your details</h2>
      <FormInput type="text" label="name" validator={validateName} />
      <FormInput type="text" label="phone" validator={validatePhone} />
      <FormInput
        type="text"
        label="address"
        validator={validateAddress}
        useTextArea
      />
      <button
        disabled={isLoading}
        type="submit"
        className={`${styles.submitButton} ${isLoading && styles.disabled}`}
      >
        {isLoading ? <Spinner size={12} /> : "Place order"}
      </button>
    </form>
  );
}

async function handleSubmit(
  event: FormEvent,
  actions: Actions,
  ref: RefObject<HTMLFormElement>
) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const details = Object.keys(VALIDATORS).reduce((acc, key) => {
    const value = formData.get(key) as string;
    return { ...acc, [key]: value };
  }, {} as Record<keyof typeof VALIDATORS, string>);

  for (const key in VALIDATORS) {
    const validator = VALIDATORS[key as keyof typeof VALIDATORS];
    const validation = validator(details[key as keyof typeof details]);
    if (validation !== true) {
      (ref.current?.querySelector(`#${key}`) as HTMLInputElement)?.focus();
      return;
    }
  }

  await actions.placeOrder(details);
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  await actions.clearCart();
  window.location.href = "/orders";
}
