import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UrlPage from "./components/UrlPage";
const App = () => {
  const [urls, setUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const createShortUrl = async (data) => {
    const res = await axios.post("http://localhost:5173/api/url", data);
    console.log(res);
    setCurrentUrl({
      originalUrl: res.data.data.originalUrl,
      shortCode: res.data.data.shortCode,
    });
    fetchUrls();
    console.log(data);
    reset();
  };
  const fetchUrls = async (data) => {
    const res = await axios.get("http://localhost:5173/api/url", data);
    console.log(res.data.data.urls);
    setUrls(res.data.data.urls);
  };

  useEffect(() => {
    fetchUrls();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center">
      <form
        onSubmit={handleSubmit(createShortUrl)}
        className=" w-full flex justify-center gap-2 p-3"
      >
        <input
          {...register("url", {
            required: "URL is required",
            minLength: {
              value: 5,
              message: "Minimum 5 characters are required",
            },
            maxLength: {
              value: 2048,
              message: "Maximum 2048 characters are required",
            },
          })}
          className="w-120 border border-black rounded p-2"
          type="url"
          placeholder="Enter long URL"
        />
        {errors.url && <p className="text-red-600 ">{errors.url.message}</p>}
        <button className="bg-orange-600 text-white cursor-pointer rounded px-5">
          Shorten
        </button>
      </form>
      <div className="w-full">
        {urls.map((url) => (
          <UrlPage key={url._id} url={url} />
        ))}
      </div>
    </div>
  );
};

export default App;
