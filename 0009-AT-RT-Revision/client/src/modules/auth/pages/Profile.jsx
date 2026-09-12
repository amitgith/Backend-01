import { useNavigate } from "react-router";
import useApi from "../../../shared/useApi";
import { useContext, useEffect } from "react";
import { MyAuth } from "../../../context/MyContext";

const Profile = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { user, setUser } = useContext(MyAuth);
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      console.log(res.data);
      setUser(res.data.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="flex flex-col gap-2 p-2">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 rounded p-2 text-white w-20 cursor-pointer "
      >
        Back
      </button>
      <h1 className="text-2xl">Profile</h1>
      <div className="w-90 flex flex-col gap-2 bg-gray-500 p-5 rounded">
        <p className="text-xl font-bold">Username: {user?.username}</p>
        <p className="text-xl font-bold">Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
