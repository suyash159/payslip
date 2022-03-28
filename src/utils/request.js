import axios from "axios";

export async function GetAll() {
  const result = await axios.get("http://localhost:5000/employee/getall");
  return result;
}
export async function DeleteById(id) {
  const result = await axios.delete(
    `http://localhost:5000/employee/delete/${id}`
  );
  console.log(result, "Delete");
  return result;
}
