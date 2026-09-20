import { useForm } from "react-hook-form";
export const useAuth = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const userRegister = (data) => {
    console.log(data);
    reset();
  };
  return { register, handleSubmit, reset, errors, userRegister };
};
