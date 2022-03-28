import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutUser(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.authCheck(false);
    localStorage.removeItem("Token");
    navigate("");
  }, []);
  return <></>;
}
