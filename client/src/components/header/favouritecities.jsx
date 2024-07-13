import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosService";

const favouritecities = () => {
  const [favourite, setFavourite] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const response = await axiosInstance.get("/favorite");
        setFavourite(response.data);
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setError("An error occurred while fetching the forecast.");
      }
    };

    fetchFavourite();
  }, []);

  return (
    <div>
        <div className="bg-slate-800 text-white">
            <h1>Favourite cities</h1>
        </div>
      {favourite && (
        <div className="">
          {favourite.map((item,i) => {
           return( <p key={i}>{item.city}</p>)
          })}
        </div>
      ) }
    </div>
  );
};

export default favouritecities;
