import React from "react";

const UrlPage = ({ url, deleteUrl }) => {
  return (
    <div className=" flex items-center justify-center gap-5 p-2">
      <a
        href={`http://localhost:3000/${url.shortCode}`}
        target="_blank"
        className="cursor-pointer border border-gray p-2"
      >
        {url.shortCode}
      </a>
      <p>{url.originalUrl.slice(0, 48)}</p>
      <p>{url.clicks}</p>
      <button className="bg-orange-600 rounded cursor-pointer text-white p-2">
        Copy
      </button>
      <button
        onClick={() => deleteUrl(url._id)}
        className="bg-red-600 rounded cursor-pointer text-white p-2"
      >
        Delete
      </button>
    </div>
  );
};

export default UrlPage;
