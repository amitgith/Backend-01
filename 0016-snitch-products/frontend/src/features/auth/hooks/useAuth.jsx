import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, registerUser } from "../state/authAction";

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
    dispatch(registerUser(data));
    reset();
  };
  const loginSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
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
