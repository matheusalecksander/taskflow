import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorage";

export function PrivateRoute({ children }: Readonly<PropsWithChildren>) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return <div>{children}</div>;
}
