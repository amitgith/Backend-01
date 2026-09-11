import { useForm } from "react-hook-form";
import { useApi } from "../../shared/useApi";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
const Register = () => {
  const navigate = useNavigate();
  const api = useApi();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const registerSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      console.log(res.data);
      navigate("/profile");
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-2 p-3">
      <h1 className="text-xl">Create account</h1>
      <form
        onSubmit={handleSubmit(registerSubmit)}
        className="w-90 flex flex-col gap-5"
      >
        <input
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
            maxLength: {
              value: 10,
              message: "Username must be at most 10 characters",
            },
          })}
          className="border border-black rounded p-2"
          type="text"
          placeholder="Enter your Username"
        />
        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}
        <input
          {...register("email", { required: "email is required" })}
          className="border border-black rounded p-2"
          type="email"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 length is required",
            },
          })}
          className="border border-black rounded p-2"
          type="password"
          placeholder="*********"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button className="bg-blue-600 rounded cursor-pointer p-2 text-white">
          Create
        </button>
      </form>
    </div>
  );
};

export default Register;
