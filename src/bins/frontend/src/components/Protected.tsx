import { ParentComponent } from "solid-js";
import { Navigate } from "@solidjs/router";
import { useAuth } from "~/context/AuthContext";

const Protected: ParentComponent = (props) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn() ? props.children : <Navigate href="/auth" />}
    </>
  );
};

export default Protected;