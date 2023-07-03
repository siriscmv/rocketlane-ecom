/*
    For validation,
    null means no validation has been done yet
    true means validation passed
    string means validation failed with the string being the error message
*/

export function validateName(name: string) {
  if (!name || name.length === 0) return null;
  const trimmed = name.trim();

  if (trimmed.length === 0) return "Name cannot be empty";
  if (trimmed.length < 3) return "Name must be at least 3 characters long";
  if (trimmed.length > 50) return "Name cannot be longer than 50 characters";

  const NAME_PATTERN = /^[a-zA-Z]+$/; // only alphabets
  if (!NAME_PATTERN.test(trimmed)) return "Name can only contain alphabets";

  return true;
}

export function validatePhone(phone: string) {
  if (!phone || phone.length === 0) return null;
  const trimmed = phone.trim();

  if (trimmed.length === 0) return "Phone cannot be empty";
  if (trimmed.length !== 10) return "Phone must be 10 characters long";

  const PHONE_PATTERN = /^[0-9]+$/; // only numbers
  if (!PHONE_PATTERN.test(trimmed)) return "Phone can only contain numbers";

  return true;
}

export function validateAddress(address: string) {
  if (!address || address.length === 0) return null;
  const trimmed = address.trim();

  if (trimmed.length === 0) return "Address cannot be empty";
  if (trimmed.length < 10) return "Address must be at least 10 characters long";
  if (trimmed.length > 200)
    return "Address cannot be longer than 200 characters";

  return true;
}
