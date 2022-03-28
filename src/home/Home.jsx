import AddEmployee from "../component/employee/addEmployee";
import GetAllEmployee from "../component/employee/getAllEmployee";
import UpdateEmployee from "../component/employee/updateEmployee";
import Navbar from "../component/navbar/nav-bar";
import Landing from "../component/pages/landing";
import PaySlip from "../component/payslip/paySlip";
import LogoutUser from "../component/users/Logout-User";
import { Outlet, Route, Routes, useRouteMatch } from "react-router-dom";
import PayslipHistory from "../component/payslip-history/payslipHistory";
import PayslipHistoryById from "../component/payslip-history/payslipHistoryById";
import PageNotFound from "../component/page-not-found/pageNotFound";

export default function Home(props) {
  let path = window.location.href;
  console.log(path);
  return (
    <>
      <Navbar authCheck={props.authCheck} />
      <Outlet />
      <Routes>
        <Route exact index element={<Landing authCheck={props.authCheck} />} />
        <Route
          exact
          path={`get`}
          element={<GetAllEmployee authCheck={props.authCheck} />}
        />
        <Route
          exact
          path={`logout`}
          element={<LogoutUser authCheck={props.func} />}
        />
        <Route
          exact
          path={`slip/:id`}
          element={<PaySlip authCheck={props.authCheck} />}
        />
        <Route
          exact
          path={`employee/:id/:slipid`}
          element={<PaySlip authCheck={props.authCheck} />}
        />
        <Route
          exact
          path={`employee/:id`}
          element={<PayslipHistoryById authCheck={props.authCheck} />}
        />
        <Route
          exact
          path={`history`}
          element={<PayslipHistory authCheck={props.authCheck} />}
        />
        <Route
          exact
          path={`add`}
          element={<AddEmployee authCheck={props.authCheck} />}
        />

        <Route
          exact
          path={`update/:id`}
          element={<UpdateEmployee authCheck={props.authCheck} />}
        />

        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </>
  );
}
