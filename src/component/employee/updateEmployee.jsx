import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../httpServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateEmployee(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.authCheck == false) {
      navigate("/login");
    }
  }, []);
  let id = useParams();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      Name: "",
      Email: "",
      EmployeeId: "",
      ContactNo: "",
      JoiningDate: "",
      Designation: "",
      Basic: "",
      HRA: "",
      SpecialAllowance: "",
      MedicalAllowance: "",
      Conveyance: "",
    },
  });
  const a = async () => {
    return await service.getRequest(`employee/getone/${id.id}`);
    // asynchronously reset your form values
  };
  useEffect(() => {
    if (id.id) {
      a()
        .then((resp) => {
          reset({
            Name: resp.Name,
            Email: resp.Email,
            EmployeeId: resp.EmployeeId,
            ContactNo: resp.ContactNo,
            JoiningDate: resp.JoiningDate,
            Designation: resp.Designation,
          });
          service.getRequest(`salary/add/${resp._id}`).then((res) => {
            reset({
              Basic: res.Basic,
              HRA: res.HRA,
              SpecialAllowance: res.SpecialAllowance,
              MedicalAllowance: res.MedicalAllowance,
              Conveyance: res.Conveyance,
            });
          });
        })
        .catch((e) => {
          console.log("err", e);
        });
    }
  }, []);

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

    service.putRequest(`employee/getone/${id.id}`, newEmployee).then((res) => {
      if (res.code == 11000) {
        alert("email already registered");
      }
      Salary.EmployeeId = res._id;
      service.putRequest(`salary/add`, Salary).then((res) => {
        navigate("/home");
      });
      toast("Updated");
    });
  };
  return (
    <>
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 m-10 rounded-2xl shadow-2xl p-10 w-[50%]"
        >
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
              id="name"
              name="name"
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
      <ToastContainer />
    </>
  );
}
