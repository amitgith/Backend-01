import { useAuth } from "../../../hooks/useAuth";
const Register = () => {
  const { register, handleSubmit, reset, errors, registerSubmit } = useAuth();
  return (
    <div className="h-screen flex  flex-col p-2 gap-5">
      <h1 className="font-bold text-xl">Register</h1>
      <form
        onSubmit={handleSubmit(registerSubmit)}
        className="w-90 flex flex-col gap-2"
      >
        <input
          {...register("email", { required: "Email is required" })}
          className="border boder-balck rounded p-2"
          type="email"
          placeholder="Enter a email "
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <input
          {...register("phone", { required: "Phone Number is required" })}
          className="border boder-balck rounded p-2"
          type="text"
          placeholder="Enter a Phone Number "
        />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
        <input
          {...register("password", { required: "Password is required" })}
          className="border boder-balck rounded p-2"
          type="password"
          placeholder="Enter a password "
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button className="bg-sky-600 rounded cursor-pointer text-white p-2">
          Create{" "}
        </button>
      </form>
    </div>
  );
};

export default Register;
