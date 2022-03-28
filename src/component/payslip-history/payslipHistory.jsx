import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../httpServices";
import { sumObject } from "../../utils/maths-subject";
import {
  Ascending,
  Descending,
  NumberAscending,
  NumberDescending,
} from "../../utils/sort";
import { AllEmployees } from "../../utils/table";
import Paginator from "react-hooks-paginator";
export default function PayslipHistory(props) {
  const [payslips, setPayslips] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (props.authCheck == false) {
      navigate("/login");
    }
  }, []);

  const param = useParams();

  useEffect(() => {
    service.getRequest(`payslip/history`).then((res) => {
      const mappedPayslip = res.map((el) => {
        el.totalDeduction = sumObject(el.Deductions);
        el.totalSalary = sumObject(el.Salary);
        el.amount = sumObject(el.Salary) - sumObject(el.Deductions);
        return el;
      });
      setPayslips(mappedPayslip);
    });
  }, []);
  const DescendingByName = (key) => {
    return Descending(payslips, key, setPayslips);
  };
  const AscendingByName = (key) => {
    Ascending(payslips, key, setPayslips);
  };
  const AscendingByNumber = (key) => {
    NumberAscending(payslips, key, setPayslips);
  };
  const DescendingByNumber = (key) => {
    NumberDescending(payslips, key, setPayslips);
  };
  async function funcDelete(id) {
    const result = await service.deleteRequest(`payslip/delete/${id}`);
    console.log(result, "result fromdelete");
    setPayslips(
      payslips.filter((item) => {
        return item._id != id;
      })
    );
  }

  // Paginationg code
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
      <AllEmployees
        employee={currentData}
        setEmployee={setPayslips}
        Asort={AscendingByName}
        Dsort={DescendingByName}
        NAsort={AscendingByNumber}
        NDsort={DescendingByNumber}
        delete={funcDelete}
      />
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
