import { Component, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./paySlip.css";
import { sumObject } from "../../utils/maths-subject";
import service from "../../httpServices";
import { toast, ToastContainer } from "react-toastify";
const logo = require("../../images/Brain-inventory.png");
const converter = require("number-to-words");
export default function PaySlip(props) {
  let initialDeductions = {
    ProfessionalTax: 0,
    ProvidentFund: 0,
    OtherDeduction: 0,
    LeaveWithoutPay: 0,
    AdvanceLoan: 0,
  };
  let initialAttandance = {
    TotalWorkingDays: 0,
    PresentDays: 0,
    CasualLeave: 0,
    EmergencyLeave: 0,
    LossOfPay: 0,
    SandwichLeave: 0,
  };
  const [gross, setGross] = useState(0);
  const [data, setData] = useState("");
  const [comp, setComp] = useState(0);
  const [salary, setSalary] = useState([]);
  const [net, setNet] = useState(0);
  const [fixedSalary, setFixedSalary] = useState(0);
  const [totalDeduc, setTotalDeduc] = useState(0);
  const [deductions, setDeductions] = useState(initialDeductions);
  const [attandance, setAttandance] = useState(initialAttandance);
  const navigate = useNavigate();
  const { id, slipid } = useParams();
  const param = useParams();
  useEffect(() => {
    if (props.authCheck == false) {
      navigate("/login");
    }
  }, []);
  function printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      //pdf.output("dataurlnewwindow");
      const pdfData = {
        Employee: data,
        Salary: salary,
        Deductions: deductions,
        Attandance: attandance,
      };
      pdf.save(`${pdfData.Employee.Name}payslip.pdf`);
      toast("payslip downloaded");
      if (slipid) {
        pdfData.Employee.EmployeeIdDb = id;
        service.putRequest(`payslip/pdf/${slipid}`, pdfData).then((res) => {
          navigate("/home");
          console.log(res);
        });
      } else {
        service.postRequest(`payslip/pdf/${id}`, pdfData).then((res) => {
          navigate("/home");
        });
      }
    });
  }
  useEffect(() => {
    if (slipid) {
      getSlipData();
    } else {
      getData();
    }
  }, []);

  function getData() {
    service.getRequest(`employee/getone/${id}`).then((res) => {
      const data = res;
      const user = {
        Name: data?.Name,
        Email: data?.Email,
        EmployeeId: data?.EmployeeId,
        ContactNo: data?.ContactNo,
        JoiningDate: data?.JoiningDate,
        Designation: data?.Designation,
      };
      setData(user);

      service.getRequest(`salary/add/${data._id}`).then((resp) => {
        console.log({ resp });
        const userSalary = {
          Basic: resp?.Basic,
          HRA: resp?.HRA,
          SpecialAllowance: resp?.SpecialAllowance,
          MedicalAllowance: resp?.MedicalAllowance,
          Conveyance: resp?.Conveyance,
        };

        setSalary(userSalary);
        setFixedSalary(sumObject(userSalary));
        setGross(fixedSalary + comp);
      });
    });
  }
  function getSlipData() {
    service.getRequest(`payslip/getone/${slipid}`).then((res) => {
      const data = res;
      const user = {
        Name: data?.Employee?.Name,
        Email: data?.Employee?.Email,
        EmployeeId: data?.Employee?.EmployeeId,
        ContactNo: data?.Employee?.ContactNo,
        JoiningDate: data?.Employee?.JoiningDate,
        Designation: data?.Employee?.Designation,
      };
      const userSalary = {
        Basic: data.Salary.Basic,
        HRA: data.Salary.HRA,
        SpecialAllowance: data.Salary.SpecialAllowance,
        MedicalAllowance: data.Salary.MedicalAllowance,
        Conveyance: data.Salary.Conveyance,
      };
      setDeductions({
        ProfessionalTax: data.Deductions.ProfessionalTax,
        ProvidentFund: data.Deductions.ProvidentFund,
        OtherDeduction: data.Deductions.OtherDeduction,
        LeaveWithoutPay: data.Deductions.LeaveWithoutPay,
        AdvanceLoan: data.Deductions.AdvanceLoan,
      });
      setAttandance({
        TotalWorkingDays: data.Attandance.TotalWorkingDays,
        PresentDays: data.Attandance.PresentDays,
        CasualLeave: data.Attandance.CasualLeave,
        EmergencyLeave: data.Attandance.EmergencyLeave,
        LossOfPay: data.Attandance.LossOfPay,
        SandwichLeave: data.Attandance.SandwichLeave,
      });
      setData(user);

      setSalary(userSalary);
      setFixedSalary(sumObject(userSalary));
      // setGross(fixedSalary + comp);
    });
  }

  function changeDeductions(amount, key) {
    setDeductions((previousValue) => {
      return {
        ...previousValue,
        [key]: Number(amount),
      };
    });
  }
  function changeAttandance(amount, key) {
    setAttandance((previousValue) => {
      return {
        ...previousValue,
        [key]: Number(amount),
      };
    });
  }

  useEffect(() => {
    setTotalDeduc(sumObject(deductions));
  }, [deductions]);
  useEffect(() => {
    let temp = fixedSalary + comp;

    setGross(temp);
  }, [comp]);
  useEffect(() => {
    let temp = fixedSalary + comp;

    setGross(temp);
  }, [fixedSalary]);

  useEffect(() => {
    setNet(gross - totalDeduc);
  }, [gross, totalDeduc]);

  return (
    <div className="flex">
      <div className="w-[3508dpi] mt-2 p-16  space-y-4" id="divToPrint">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            width="50"
            height="50"
            className="rounded-full"
            alt="bi image"
          />
          <h1>Brain Inventory</h1>
        </div>
        <div className="space-y-3">
          <div>
            <h4>EMPLOYEE SALARY SLIP - JANUARY 2022</h4>
          </div>
          <div className="space-y-5">
            <div className="ml-5">
              <h5 className="mb-2">1. Employee Details</h5>
              <table id="paytable" className=" w-full ml-5">
                {Object.keys(data).map((key) => {
                  return (
                    <tr className=" ">
                      <td id="paytd" className=" w-1/2  ">
                        Employee's {key}
                      </td>
                      <td id="paytd" className=" w-1/2  ">
                        {data[key]}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="ml-5">
              <h5 className="mb-2">2. Attandance Details</h5>
              <table id="paytable" className=" w-full ml-5">
                <tr className=" ">
                  <td id="paytd" className=" w-1/2 ">
                    Total Working Days
                  </td>
                  <td id="paytd" className=" w-1/2  ">
                    <input
                      type="number"
                      value={attandance.TotalWorkingDays}
                      onChange={(e) =>
                        changeAttandance(e.target.value, "TotalWorkingDays")
                      }
                      className="w-full border-0 p-0 font-bold"
                    />
                  </td>
                </tr>
                <tr className=" ">
                  <td id="paytd" className=" w-1/2  ">
                    Present Days
                  </td>
                  <td id="paytd" className=" w-1/2  ">
                    <input
                      type="number"
                      value={attandance.PresentDays}
                      onChange={(e) =>
                        changeAttandance(e.target.value, "PresentDays")
                      }
                      className="w-full border-0 p-0 font-bold"
                    />
                  </td>
                </tr>
                <tr className=" ">
                  <td id="paytd" className=" w-1/2  ">
                    Casual Leave
                  </td>
                  <td id="paytd" className=" w-1/2  ">
                    <input
                      type="number"
                      value={attandance.CasualLeave}
                      onChange={(e) =>
                        changeAttandance(e.target.value, "CasualLeave")
                      }
                      className="w-full border-0 p-0 font-bold"
                    />
                  </td>
                </tr>
                <tr className=" ">
                  <td id="paytd" className=" w-1/2  ">
                    Emergency Leave
                  </td>
                  <td id="paytd" className=" w-1/2  ">
                    <input
                      type="number"
                      value={attandance.EmergencyLeave}
                      onChange={(e) =>
                        changeAttandance(e.target.value, "EmergencyLeave")
                      }
                      className="w-full border-0 p-0 font-bold"
                    />
                  </td>
                </tr>
                <tr className=" ">
                  <td id="paytd" className=" w-1/2  ">
                    Loss Of Pay
                  </td>
                  <td id="paytd" className=" w-1/2  ">
                    <input
                      type="number"
                      value={attandance.LossOfPay}
                      onChange={(e) =>
                        changeAttandance(e.target.value, "LossOfPay")
                      }
                      className="w-full border-0 p-0 font-bold"
                    />
                  </td>
                </tr>
                <tr className=" ">
                  <td id="paytd" className=" w-1/2  ">
                    Sandwich Leave
                  </td>
                  <td id="paytd" className=" w-1/2  ">
                    <input
                      type="number"
                      value={attandance.SandwichLeave}
                      onChange={(e) =>
                        changeAttandance(e.target.value, "SandwichLeave")
                      }
                      className="w-full border-0 p-0 font-bold"
                    />
                  </td>
                </tr>
              </table>
            </div>
            <div className="ml-5 w-full">
              <h5 className="mb-2">3. Salary Details</h5>
              <div className="flex space-x-0 ">
                <table id="paytable" className=" w-[50%] ml-5">
                  <tr className="">
                    <td id="paytd" className=" w-1/2  ">
                      Earning(s)
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      Amount
                    </td>
                  </tr>
                  {Object.keys(salary).map((key) => {
                    return (
                      <tr className=" ">
                        <td id="paytd" className=" w-1/2  ">
                          {key}
                        </td>
                        <td id="paytd" className=" w-1/2  ">
                          {salary[key]}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      <span className="">Comp-off</span>
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      <input
                        type="number"
                        value={comp}
                        onChange={(e) =>
                          setComp(
                            e.target.valueAsNumber > 0
                              ? e.target.valueAsNumber
                              : 0
                          )
                        }
                        className="w-full border-0 p-0 font-bold"
                      />
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Gross Pay
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      {gross}
                    </td>
                  </tr>
                </table>
                <table id="paytable" className=" w-[50%] border-l-0">
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Deduction(s)
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      Amount
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Professional Tax
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      <input
                        type="number"
                        value={deductions.ProfessionalTax}
                        onChange={(e) =>
                          changeDeductions(e.target.value, "ProfessionalTax")
                        }
                        className="w-full border-0 p-0 font-bold"
                      />
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Provident Fund
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      <input
                        type="number"
                        value={deductions.ProvidentFund}
                        onChange={(e) =>
                          changeDeductions(e.target.value, "ProvidentFund")
                        }
                        className="w-full border-0 p-0 font-bold"
                      />
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Other Deduction
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      <input
                        type="number"
                        value={deductions.OtherDeduction}
                        onChange={(e) =>
                          changeDeductions(e.target.value, "OtherDeduction")
                        }
                        className="w-full border-0 p-0 font-bold"
                      />
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Leave Without Pay
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      <input
                        type="number"
                        value={deductions.LeaveWithoutPay}
                        onChange={(e) =>
                          changeDeductions(e.target.value, "LeaveWithoutPay")
                        }
                        className="w-full border-0 p-0 font-bold"
                      />
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Advance Loan
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      <input
                        type="number"
                        value={deductions.AdvanceLoan}
                        onChange={(e) =>
                          changeDeductions(e.target.value, "AdvanceLoan")
                        }
                        className="w-full border-0 p-0 font-bold appearance-none"
                      />
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Total Deduction's
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      {totalDeduc}
                    </td>
                  </tr>
                  <tr className=" ">
                    <td id="paytd" className=" w-1/2  ">
                      Net Pay
                    </td>
                    <td id="paytd" className=" w-1/2  ">
                      {net}
                    </td>
                  </tr>
                </table>
              </div>
              <h3 className="mt-5 font-semibold">
                Net Salary Payable : Rs {net}/- (
                {net > 0 ? converter.toWords(net) : null} only)
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <button onClick={() => printDocument()}>Print slip</button>
      </div>
      <ToastContainer />
    </div>
  );
}
