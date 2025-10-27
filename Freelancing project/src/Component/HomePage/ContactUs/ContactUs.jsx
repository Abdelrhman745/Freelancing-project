import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`الإيميل: ${formData.email}\nالرسالة: ${formData.message}`);
    setFormData({ email: "", message: "" });
  };

  return (
    <div className="container my-5" dir="rtl">
      <div className="card shadow-lg p-4 text-center">
        <h2 className="text-center mb-4 text-primary">تواصل معنا</h2>

        <div className="mb-4">
          <p>
            <strong>الإيميل:</strong> mohamed.reda4465@gmail.com
          </p>
          <p>
            <strong>رقم التليفون:</strong> 01114184854
          </p>
          <p>
            <strong>العنوان:</strong> النجاح - أمام المستوصف الخليل الخيري
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-end">
            <label className="form-label">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="أدخل بريدك الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-end">
            <label className="form-label">الرسالة</label>
            <textarea
              name="message"
              className="form-control"
              placeholder="أدخل رسالتك هنا..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn bg-dark text-white w-25">
              إرسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

