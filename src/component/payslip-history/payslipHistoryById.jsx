import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../httpServices";
import { sumObject } from "../../utils/maths-subject";
import Paginator from "react-hooks-paginator";

export default function PayslipHistoryById(props) {
  const [payslips, setPayslip] = useState([]);
  const [Name, setName] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (props.authCheck == false) {
      navigate("/login");
    }
  }, []);

  function getPaySlip(id) {
    navigate(`${id}`);
  }

  const param = useParams();
  useEffect(() => {
    service.getRequest(`payslip/history/${param.id}`).then((res) => {
      setName(res[0].Employee.Name);
      const a = res.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
      console.log(a, "sorted");
      const mappedData = res.map((el) => {
        let date = el?.createdAt?.split("T")[0];
        return {
          totalDeduction: sumObject(el.Deductions),
          totalSalary: sumObject(el.Salary),
          slipId: el._id,
          date: date ?? "NA",
        };
      });
      setPayslip(mappedData);
    });
  }, []);
  // Pagination

  const pageLimit = 10;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(payslips.slice(offset, offset + pageLimit));
  }, [offset, payslips]);

  // end

  return (
    <>
      <h1 className="flex justify-center mb-5 text-3xl">{Name}</h1>
      <div className="flex justify-center">
        <table className="table table-zebra">
          <tbody>
            <tr>
              <th>Slip Id</th>
              <th>Total Salary</th>
              <th>Total Deduction</th>
              <th>Date</th>
              <th></th>
            </tr>
            {currentData.map((element) => {
              return (
                <tr>
                  <td>{element.slipId}</td>
                  <td>{element.totalSalary}</td>
                  <td>{element.totalDeduction}</td>
                  <td>{element.date}</td>
                  <td>
                    <button onClick={() => getPaySlip(element.slipId)}>
                      Create Pay Slip
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Paginator
        totalRecords={payslips.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
