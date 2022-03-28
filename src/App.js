import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PageNotFound from "./component/page-not-found/pageNotFound";
import Landing from "./component/pages/landing";

import LoginUser from "./component/users/Login-User";
import Home from "./home/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("Token") ? true : false
  );

  return (
    <>
      {/* <Landing />; */}
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={<LoginUser authCheck={setIsAuthenticated} />}
          />

          <Route
            default
            path="/home/*"
            element={
              <Home authCheck={isAuthenticated} func={setIsAuthenticated} />
            }
          ></Route>
          <Route path="" element={<Navigate path="" to="/home" />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
