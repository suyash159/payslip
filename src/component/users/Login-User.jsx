import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import service from "../../httpServices";

export default function LoginUser(props) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    service.postRequest("user/login", data).then((res) => {
      console.log(res, "employee data");
      localStorage.setItem("Token", res?.token);
      props.authCheck(true);
      navigate("/home");
    });
  };
  return (
    <div className="h-screen border-2  flex  items-center justify-center ">
      <div className="flex items-center justify-center sm:p-[2%] lg:p-[5%] sm:w-[50%] lg:w-[30%]  rounded-2xl shadow-2xl sm:h-[85%] lg:h-[70%] border-2">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              for="Password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Password
            </label>
            <input
              id="Password"
              name="Password"
              type="Password"
              {...register("Password")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password"
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
