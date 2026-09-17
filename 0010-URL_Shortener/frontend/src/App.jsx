import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UrlPage from "./components/UrlPage";
const App = () => {
  const dummyUrls = [
    {
      _id: "1",
      originalUrl:
        "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
      shortCode: "IUSJDF",
      clicks: 9,
    },
    {
      _id: "2",
      originalUrl:
        "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
      shortCode: "IUSJDF",
      clicks: 5,
    },
    {
      _id: "3",
      originalUrl:
        "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
      shortCode: "IUSJDF",
      clicks: 4,
    },
  ];
  const [urls, setUrls] = useState(dummyUrls);
  const [currentUrl, setCurrentUrl] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const urlSubmit = async (data) => {
    console.log(data);
    const res = await axios.get("http://localhost:5173/api/url");
    console.log(res.data.data.urls);
    setUrls(res.data.data.urls);
    reset();
  };
  return (
    <div className="w-full flex flex-col justify-center">
      <form
        onSubmit={handleSubmit(urlSubmit)}
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
        {urls.map((val) => {
          return <UrlPage key={val.id} url={val} />;
        })}
      </div>
    </div>
  );
};

export default App;
