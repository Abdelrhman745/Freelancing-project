import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id, category } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => {
        const foundProduct = res.data.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => {
        const filtered = res.data.filter(
          (item) =>
            item.category?.toLowerCase() === category?.toLowerCase()
        );
        setRelated(filtered);
      })
      .catch((err) => {
        console.error("Error fetching related products:", err);
      });
  }, [category]);

  function goBack() {
    navigate("/home");
  }

  if (!product)
    return <p className="text-center p-5">Loading product...</p>;

  return (
    <div className="container py-5">

      <div className="row d-flex justify-content-between align-items-start">
        <div className="col-md-4">
          <img
            src={product?.image}
            alt={product.title}
            className="rounded-4 prodImg w-100"
          />
        </div>

        <div className="col-md-7 p-4">
          <h2>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>

          <div className="d-flex justify-content-between align-items-center my-4">
            <h3 className="text-success fw-bold">{product.price} $</h3>
            <p>
              <i className="fa-solid fa-star text-warning"></i>{" "}
              {product.ratingsAverage}
              <span> ({product.ratingsQuantity} reviews)</span>
            </p>
          </div>

          <button
            className="btn btn-dark fs-5 p-2 mt-2 w-100"
            onClick={goBack}
          >
            Back
          </button>
        </div>
      </div>

      {/* منتجات ذات صلة */}
      <div className="row mt-5">
        <h3 className="mb-4 fw-bold text-center">منتجات ذات صلة</h3>

        {related.length > 1 ? (
          <Slider {...settings} className="text-center related-slider" dir="rtl">
  {related
    ?.filter((prod) => prod.id !== product.id)
    .map((prod) => (
      <div key={prod.id} className="p-2">
        <ProductCard product={prod} />
      </div>
    ))}
</Slider>

        ) : (
          <p className="text-center text-muted">
            لا توجد منتجات مشابهة حالياً.
          </p>
        )}
      </div>
    </div>
  );
}
