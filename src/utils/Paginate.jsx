import React, { useState } from "react";

const Paginate = (employee, currentPage) => {
  console.log({ employee });
  const [itemPerPage, setItemPerPage] = useState(10);
  if (employee.length == 0) {
    console.log("data nhi aa rha");
    return;
  } else {
    console.log(employee, "item array");
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const newArray = employee?.slice(indexOfFirstItem, indexOfLastItem);

    console.log({ newArray });

    return { newArray, itemPerPage };
  }
};

export default Paginate;
