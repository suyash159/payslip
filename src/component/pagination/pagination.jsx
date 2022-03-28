import React from "react";

function Pagination({ payslipPerPage, totalPayslip, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPayslip / payslipPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className=" flex justify-center">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} hred="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
