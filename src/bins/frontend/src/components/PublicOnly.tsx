import { ParentComponent } from "solid-js";
import { Navigate } from "@solidjs/router";
import { useAuth } from "~/context/AuthContext";

const PublicOnly: ParentComponent = (props) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn() ? <Navigate href="/" /> : props.children}
    </>
  );
};

export default PublicOnly;