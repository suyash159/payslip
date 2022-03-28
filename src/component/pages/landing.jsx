import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddEmployee from "../employee/addEmployee";
import GetAllEmployee from "../employee/getAllEmployee";

export default function Landing(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.authCheck == false) {
      navigate("/login");
    }
  }, []);
  console.log(props);
  return (
    <>
      <GetAllEmployee />
    </>
  );
}
