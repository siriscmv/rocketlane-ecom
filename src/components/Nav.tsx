import { useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  return (
    <nav>
      <h2>{location.pathname}</h2>
    </nav>
  );
}
