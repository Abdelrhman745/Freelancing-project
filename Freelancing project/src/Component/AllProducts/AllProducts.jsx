import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

export default function AllProducts() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // 🧭 pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // عدد المنتجات في الصفحة الواحدة

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
    setCurrentPage(1); // عند تغيير الفلترة، نرجع للصفحة الأولى
  }, [search, category, priceRange, data]);

  const categories = ["All", ...new Set(data.map((item) => item.category))];

  // 🧮 حساب البيانات المعروضة في الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 🔢 حساب عدد الصفحات
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // لما نبدل الصفحة، يطلع لأعلى الصفحة
  };

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

      {/* 🛍️ عرض المنتجات */}
      <div className="row g-4 justify-content-center">
        {currentItems.length > 0 ? (
          currentItems.map((item, i) => (
            <div key={i} className="col-12 col-md-4 col-lg-3">
              <ProductCard product={item} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            لا توجد منتجات مطابقة للبحث.
          </p>
        )}
      </div>

      {/* 🔄 أزرار التنقل بين الصفحات */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                السابق
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                التالي
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
