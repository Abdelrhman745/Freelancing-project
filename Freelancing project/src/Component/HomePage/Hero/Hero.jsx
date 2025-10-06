import React from "react";
import img1 from "../../../assets/photos/1.jpg";
import img2 from "../../../assets/photos/2.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="container py-5 hero-section" dir="rtl">
      <div className="row align-items-center g-5">
        {/* Left: images */}
        <div className="col-12 col-lg-6">
          <div className="position-relative hero-images">
            <img
              src={img1}
              alt="صورة 1"
              className="shadow-lg rounded position-absolute hero-img-1"
            />
            <img
              src={img2}
              alt="صورة 2"
              className="shadow-lg rounded position-absolute hero-img-2"
            />
            
          </div>
        </div>

        {/* Right: text */}
        <div className="col-12 col-lg-6 text-end">
          <h1 className="display-5 fw-bold mb-3">
            مرحباً بك في <span className="text-primary">BOBOS</span>
          </h1>
          <p className="lead text-muted mb-4">
            اكتشف أحدث المنتجات بجودة عالية وتصميم عصري. نسعى لتقديم تجربة تسوق
            سهلة وسريعة، مع شحن موثوق وخيارات دفع متعددة.
          </p>
          <div className="d-flex justify-content-end gap-2">
            <a href="#products" className="btn bg-dark text-white px-5 ">
              تسوّق الآن
            </a>
            <a href="#about" className="btn btn-outline-secondary px-5 ">
              اعرف أكثر
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


