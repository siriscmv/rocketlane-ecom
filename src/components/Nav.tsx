import { useLocation } from "react-router-dom";

const ROUTES = {
  "/": "Shop Items",
  "/cart": "Your Cart",
  "/invoice": "Your Invoice",
  "/error": "Error",
};

export default function Nav() {
  const location = useLocation();

  return (
    <nav>
      <h2>{ROUTES[location.pathname as keyof typeof ROUTES]}</h2>
    </nav>
  );
}
