import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLogin, userRegister } from "../state/auth/authAction";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
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
  const loginSubmit = (data) => {
    console.log(data);
    dispatch(userLogin(data));
    reset();
  };
  return {
    register,
    handleSubmit,
    reset,
    errors,
    registerSubmit,
    loginSubmit,
    navigate,
  };
};
