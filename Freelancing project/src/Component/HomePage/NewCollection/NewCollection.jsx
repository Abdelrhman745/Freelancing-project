import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../ProductCard/ProductCard";

export default function NewCollection() {
  const [data, setData] = useState([]);

useEffect(() => {
    axios
      .get("/data.json") 
      .then((res) => {
        const firstNine = res.data.slice(10, 18);
        setData(firstNine);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
        <div className="container my-5 d-flex flex-column align-items-center">
      <h1 className="fw-bold text-center border-bottom border-3 p-2" style={{width:"25%"}}>كوليكشن جديد</h1>
      <div className="row g-4 justify-content-center">
        {data.length > 0 ? (
          data.map((item, i) => (
        <div className="col-12 col-md-4 col-lg-3"><ProductCard key={i} product={item} /></div>
               
      
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </>
  );
}
