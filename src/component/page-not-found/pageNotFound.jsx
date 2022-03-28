import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-16 justify-center items-center">
      <h1 className="text-red-600 text-5xl">Error 404</h1>
      <p className="text-red-600 text-3xl">Page Not Found</p>
      {localStorage.getItem("Token") ? (
        <Link to={"home"}>Home</Link>
      ) : (
        <Link to={"login"}>Login</Link>
      )}
    </div>
  );
}

export default PageNotFound;
