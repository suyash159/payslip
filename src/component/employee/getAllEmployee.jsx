import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../httpServices";
import Paginator from "react-hooks-paginator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Ascending,
  Descending,
  NumberAscending,
  NumberDescending,
} from "../../utils/sort";
import Pagination from "../pagination/pagination";

export default function GetAllEmployee(props) {
  const [delId, setDelId] = useState();
  const [modal, setModal] = useState(false);

  let result;
  const navigate = useNavigate();
  useEffect(() => {
    if (props.authCheck == false) {
      navigate("/login");
    }
  }, []);

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    service.getRequest("employee/getall").then((data) => {
      console.log({ data });

      setEmployee([...data]);
    });
  }, []);

  function editHandler(id) {
    navigate(`update/${id}`);
  }
  function paySlipHandler(id) {
    navigate(`slip/${id}`);
  }
  function paySlipHistoryHandler(id) {
    navigate(`employee/${id}`);
  }
  async function funcDelete(id) {
    const result = await service.deleteRequest(`employee/delete/${id}`);
    console.log(result, "result fromdelete");
    setEmployee(
      employee.filter((item) => {
        return item._id != id;
      })
    );
    toast("Deleted employee");
  }

  //Sorting

  const DescendingByName = (key) => {
    Descending(employee, key, setEmployee);
  };
  const AscendingByName = (key) => {
    Ascending(employee, key, setEmployee);
  };
  const AscendingByNumber = (key) => {
    NumberAscending(employee, key, setEmployee);
  };
  const DescendingByNumber = (key) => {
    NumberDescending(employee, key, setEmployee);
  };

  // Pagination

  const pageLimit = 10;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(employee.slice(offset, offset + pageLimit));
  }, [offset, employee]);

  return (
    <>
      <div className="">
        <div className="flex justify-center ">
          <table class="table table-zebra  ">
            <thead>
              <tr>
                <th
                  onClick={() => AscendingByName("employee.Name")}
                  onDoubleClick={() => DescendingByName("employee.Name")}
                >
                  Employee Name
                </th>
                <th
                  onClick={() => AscendingByName("employee.Email")}
                  onDoubleClick={() => DescendingByName("employee.Email")}
                >
                  Employee Email
                </th>
                <th
                  onClick={() => DescendingByNumber("employee.ContactNo")}
                  onDoubleClick={() => DescendingByNumber("employee.ContactNo")}
                >
                  Employee Contact
                </th>
                <th
                  onClick={() => AscendingByName("employee.EmployeeId")}
                  onDoubleClick={() => DescendingByName("employee.EmployeeId")}
                >
                  Employee Id
                </th>
                <th
                  onClick={() => AscendingByNumber("employee.JoiningDate")}
                  onDoubleClick={() =>
                    DescendingByNumber("employee.JoiningDate")
                  }
                >
                  Employee Joining Date
                </th>
                <th
                  onClick={() => AscendingByName("employee.Designation")}
                  onDoubleClick={() => DescendingByName("employee.Designation")}
                >
                  Employee Designation
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((data, i) => (
                <tr>
                  <td>{data.Name}</td>
                  <td>{data.Email}</td>
                  <td>{data.ContactNo}</td>
                  <td>{data.EmployeeId}</td>
                  <td>{data.JoiningDate}</td>
                  <td>{data.Designation}</td>
                  <td>
                    <div class="dropdown dropdown-hover">
                      <label tabindex="0" class=" m-1">
                        Action
                      </label>
                      <ul
                        tabindex="0"
                        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button onClick={() => editHandler(data._id)}>
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={(e) => {
                              setModal(true);

                              setDelId(data._id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => paySlipHistoryHandler(data._id)}
                          >
                            Pay Slip History
                          </button>
                        </li>
                        <li>
                          <button onClick={() => paySlipHandler(data._id)}>
                            Create Pay Slip
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-5 mt-9">
          <button
            onClick={() => navigate("add")}
            className="border-2 p-2 w-36 h-10 bg-blue-600 rounded-2xl text-slate-50"
          >
            Add Employee
          </button>
        </div>
      </div>
      <ToastContainer />

      {/* modal starts */}

      {modal ? (
        <div className="absolute inset-0 bg-drop">
          <div className="flex items-center justify-center min-h-screen min-w-screen">
            <div className="bg-white rounded-md p-5 w-[500px] h-[150px] ">
              <h1>Confirm to delete</h1>
              <div className="flex space-x-3  mt-[50px] justify-end">
                <button
                  onClick={() => {
                    setModal(false);
                    funcDelete(delId);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Paginator
        totalRecords={employee.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
