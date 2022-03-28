import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../httpServices";

export function AllEmployees(props) {
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState();

  console.log(props.employee);
  // if (props.loading) {
  //   return <h2>Loading..</h2>;
  // }

  // useEffect(() => {
  //   let copy = props.employee;
  //   props.setEmployee(
  //     q.length > 0
  //       ? copy.filter((item) => {
  //           return item.Employee.Name.toLowerCase().includes(q.toLowerCase());
  //         })
  //       : props.employee
  //   );
  //   // service.postRequest(`payslip/search`, { param: q }).then((res) => {
  //   //   console.log(res, "response of search");
  //   // });
  // }, [q]);

  return (
    <>
      <div className="flex justify-center">
        <table class="table table-zebra table-auto w-[70]%">
          <thead>
            <tr>
              <th
                onClick={() => props.Asort("employee.Employee.EmployeeId")}
                onDoubleClick={() =>
                  props.Dsort("employee.Employee.EmployeeId")
                }
              >
                Employee Id
              </th>
              <th
                onClick={() => props.Asort("employee.Employee.Name")}
                onDoubleClick={() => props.Dsort("employee.Employee.Name")}
              >
                Employee Name
              </th>
              <th
                onClick={() => props.Asort("employee.Employee.Email")}
                onDoubleClick={() => props.Dsort("employee.Employee.Email")}
              >
                Employee Email
              </th>
              <th
                onClick={() => props.NAsort("totalSalary")}
                onDoubleClick={() => props.NDsort("totalSalary")}
              >
                Total Salary
              </th>
              <th
                onClick={() => props.NAsort("totalDeduction")}
                onDoubleClick={() => props.NDsort("totalDeduction")}
              >
                Total Deduction
              </th>
              <th
                onClick={() => props.NAsort("amount")}
                onDoubleClick={() => props.NDsort("amount")}
              >
                Amount
              </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.employee.map((element) => {
              return (
                <tr>
                  <td>{element.Employee.EmployeeId}</td>
                  <td>{element.Employee.Name}</td>
                  <td>{element.Employee.Email}</td>
                  <td>{element.totalSalary}</td>
                  <td>{element.totalDeduction}</td>
                  <td>{element.amount}</td>
                  <td
                    onClick={() => {
                      setModal(true);
                      setDelId(element._id);
                    }}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
                    props.delete(delId);
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
    </>
  );
}
