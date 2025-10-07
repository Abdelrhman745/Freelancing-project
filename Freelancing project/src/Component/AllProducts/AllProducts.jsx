import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard"; 

export default function AllProducts() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

 
  useEffect(() => {
    let result = data;

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

  
    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

   
    if (priceRange !== "All") {
      result = result.filter((item) => {
        const price = item.price;
        if (priceRange === "low") return price < 400;
        if (priceRange === "medium") return price >= 400 && price <= 500;
        if (priceRange === "high") return price > 500;
        return true;
      });
    }

    setFilteredData(result);
  }, [search, category, priceRange, data]);

 
  const categories = ["All", ...new Set(data.map((item) => item.category))];

  return (
    <div className="container my-5" dir="rtl">
      <h1 className="text-center fw-bold mb-4 border-bottom border-3 d-inline-block p-2">
        كل المنتجات
      </h1>

      <div className="row mb-4 justify-content-center">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث باسم المنتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat === "All" ? "كل الفئات" : cat}
              </option>
            ))}
          </select>
        </div>

      
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="All">كل الأسعار</option>
            <option value="low">أقل من 400</option>
            <option value="medium">من 400 إلى 500</option>
            <option value="high">أكثر من 500</option>
          </select>
        </div>
      </div>

      <div className="row g-4 justify-content-center">
        {filteredData.length > 0 ? (
          filteredData.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))
        ) : (
          <p className="text-center text-muted">لا توجد منتجات مطابقة للبحث.</p>
        )}
      </div>
    </div>
  );
}
