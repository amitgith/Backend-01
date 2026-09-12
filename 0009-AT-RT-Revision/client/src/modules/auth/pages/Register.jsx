import { useForm } from "react-hook-form";
import useApi from "../../../shared/useApi";
import { useContext } from "react";
import { MyAuth } from "../../../context/MyContext";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser, accessToken, setAccessToken } = useContext(MyAuth);
  const api = useApi();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const registerSubmit = async (data) => {
    try {
      let res = await api.post("/auth/register", data);
      console.log(res.data);
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      reset();
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-3 p-2">
      <h1 className="text-xl">Register</h1>
      <form
        onSubmit={handleSubmit(registerSubmit)}
        className="w-90 flex flex-col gap-3"
      >
        <input
          {...register("username", {
            required: "username is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters are required",
            },
            maxLength: {
              value: 10,
              message: "Maximum 10 characters are required",
            },
          })}
          className="border border-black rounded p-2"
          type="text"
          placeholder="Enter Your username"
        />
        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}
        <input
          {...register("email", { required: "email is required" })}
          className="border border-black rounded p-2"
          type="email"
          placeholder="Enter Your email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <input
          {...register("password", { required: "password is required" })}
          className="border border-black rounded p-2"
          type="password"
          placeholder="Enter Your password"
        />
        {errors.password && (
          <p className="text-red-600"> {errors.password.message}</p>
        )}
        <button className="bg-blue-600 rounded cursor-pointer text-white p-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default Register;
