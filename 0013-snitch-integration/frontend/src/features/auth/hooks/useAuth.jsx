import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userRegister } from "../state/auth/authAction";

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const registerSubmit = (data) => {
    console.log(data);
    dispatch(userRegister(data));
    reset();
  };
  return { register, handleSubmit, reset, errors, registerSubmit };
};
