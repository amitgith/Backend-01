import React from "react";

const UrlPage = ({ url }) => {
  return (
    <div className=" flex items-center justify-center gap-2 p-2">
      <h1>{url.shortCode}</h1>
      <p>{url.originalUrl}</p>
      <p>{url.clicks}</p>
      <button className="bg-orange-600 rounded cursor-pointer text-white p-2">
        Copy
      </button>
      <button className="bg-red-600 rounded cursor-pointer text-white p-2">
        Delete
      </button>
    </div>
  );
};

export default UrlPage;
