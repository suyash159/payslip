import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import service from "../../httpServices";

export default function AddEmployee(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.authCheck == false) {
      console.log(props.authCheck, "after refresh");
      navigate("/login");
    }
  }, []);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const newEmployee = {
      Name: data.Name,
      Email: data.Email,
      EmployeeId: data.EmployeeId,
      ContactNo: data.ContactNo,
      JoiningDate: data.JoiningDate,
      Designation: data.Designation,
    };
    const Salary = {
      Basic: data.Basic,
      HRA: data.HRA,
      SpecialAllowance: data.SpecialAllowance,
      MedicalAllowance: data.MedicalAllowance,
      Conveyance: data.Conveyance,
    };
    service.postRequest("employee/add", newEmployee).then((res) => {
      console.log(res, "employee data");
      if (res.code == 11000) {
        alert("email already registered");
      }
      Salary.EmployeeId = res._id;
      service.postRequest(`salary/add`, Salary).then((res) => {
        console.log(res, "salary");
        console.log({ Salary });
        navigate("/home");
      });
    });
  };

  return (
    <div className="flex justify-center">
      <div className="m-16  border-2 rounded-2xl shadow-2xl w-[50%]">
        <form onSubmit={handleSubmit(onSubmit)} className="m-6">
          <div class="mb-6 ">
            <label
              for="Email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Email
            </label>
            <input
              id="Email"
              name="Email"
              type="Email"
              {...register("Email")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="Designation"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Designation
            </label>
            <input
              id="Designation"
              name="Designation"
              type="Designation"
              {...register("Designation")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Designation"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="Name"
              name="Name"
              {...register("Name")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Employee Name"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="salary"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Employee Id
            </label>
            <input
              id="EmployeeId"
              name="EmployeeId"
              {...register("EmployeeId")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Employee Id"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="salary"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Contact No
            </label>
            <input
              id="ContactNo"
              name="ContactNo"
              type="number"
              {...register("ContactNo")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Contact No"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="salary"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Joining date
            </label>
            <input
              id="JoiningDate"
              name="JoiningDate"
              type="date"
              {...register("JoiningDate")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Joining date"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="basic"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Basic
            </label>
            <input
              id="Basic"
              name="Basic"
              type="number"
              {...register("Basic")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Basic"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="HRA"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              HRA
            </label>
            <input
              id="HRA"
              name="HRA"
              type="number"
              {...register("HRA")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="HRA"
              required
            ></input>
          </div>

          <div class="mb-6">
            <label
              for="Special Allowance"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Special Allowance
            </label>
            <input
              id="SpecialAllowance"
              name="SpecialAllowance"
              type="number"
              {...register("SpecialAllowance")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Special Allowance   "
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="Medical Allowance"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Medical Allowance
            </label>
            <input
              id="MedicalAllowance"
              name="MedicalAllowance"
              type="number"
              {...register("MedicalAllowance")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Medical Allowance   "
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="Conveyance"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Conveyance
            </label>
            <input
              id="Conveyance"
              name="Conveyance"
              type="number"
              {...register("Conveyance")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Conveyance   "
              required
            ></input>
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
