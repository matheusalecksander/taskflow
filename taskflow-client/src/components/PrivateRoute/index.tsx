import { PropsWithChildren, useEffect } from "react";
import { useLogin } from "../../pages/login/hooks/useLogin";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: Readonly<PropsWithChildren>) {
  const { getItem } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [getItem, navigate]);

  return <div>{children}</div>;
}
