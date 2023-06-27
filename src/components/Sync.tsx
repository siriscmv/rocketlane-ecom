import { ReactNode, useContext, useEffect } from "react";
import { Context } from "../utils/Context";

export default function Sync(props: { children: ReactNode }) {
  const { state, actions } = useContext(Context)!;
  useEffect(() => {
    if (!state.initialSynced) actions.syncWithBackend();
  }, []);

  return <>{props.children}</>;
}
