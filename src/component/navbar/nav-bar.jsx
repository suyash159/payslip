import { Link, useNavigate } from "react-router-dom";

const logo = require("../../images/Brain-inventory.png");
const url = "localhost:3000";

export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <img
              src={logo}
              width="50"
              height="50"
              className="rounded-full"
              alt="bi image"
            />
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href={`${url}/`}>Home</a>
              </li>
              <li tabindex="0">
                <a class="justify-between">
                  Parent
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul class="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/logout">Log-out</a>
              </li>
            </ul>
          </div>
          <a class="btn btn-ghost normal-case text-xl">Brain Inventory</a>
        </div>
        <div class="navbar-center  lg:flex">
          <ul class="menu menu-horizontal p-0">
            <li>
              <a
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </a>
            </li>
            <li tabindex="0">
              <Link to="add">Add</Link>
            </li>
            <li>
              <Link to="history">History</Link>
            </li>
          </ul>
        </div>
        <div class="navbar-end">
          <a class="btn" onClick={() => navigate("logout")}>
            Log-out
          </a>
        </div>
      </div>
    </div>
  );
}
