import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]); // ⬅️ المنتجات من JSON
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  });

  // 📦 تحميل المنتجات من ملف JSON
  useEffect(() => {
    fetch('/public/data.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('خطأ في تحميل المنتجات:', err));
  }, []);

  // 📊 بيانات ثابتة (إجمالي الطلبات، الإيرادات...الخ)
  const mockStats = {
    totalProducts: products.length,
    totalOrders: 156,
    totalRevenue: products.reduce((acc, p) => acc + p.price, 0),
    totalCustomers: 89,
  };

  // 🧮 واجهة الإحصائيات
  const renderStats = () => (
    <div className="row justify-content-center mb-4">
      {[
        { label: 'إجمالي المنتجات', value: mockStats.totalProducts },
       
      
      ].map((item, i) => (
        <div className="col-md-3" key={i}>
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{item.label}</h5>
              <p className="card-text fw-bold">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // 👁️ عرض نظرة عامة
  const OverviewView = () => (
    <div>
      <h3 className="mb-4">نظرة عامة</h3>
      {renderStats()}

      <div className="row">
        <div className="col-md-8 mb-4">
          <h5>المنتجات الحديثة</h5>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الفئة</th>
                <th>السعر</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.price} ج.م</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4 mb-4">
          <h5>الفئات الأكثر انتشاراً</h5>
          <ul className="list-group">
            {Object.entries(
              products.reduce((acc, p) => {
                acc[p.category] = (acc[p.category] || 0) + 1;
                return acc;
              }, {})
            ).map(([cat, count]) => (
              <li
                key={cat}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {cat}
                <span className="badge bg-primary rounded-pill">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // 🛍️ عرض المنتجات
  const ProductsView = () => (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3>إدارة المنتجات</h3>
        <button
          className="btn btn-dark"
          onClick={() => {
            setEditingProduct(null);
            setFormData({ title: '', price: '', category: '', description: '' });
            setShowModal(true);
          }}
        >
          إضافة منتج جديد
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الفئة</th>
            <th>السعر</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.price} ج.م</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary me-1"
                  onClick={() => {
                    setEditingProduct(product);
                    setFormData(product);
                    setShowModal(true);
                  }}
                >
                  تعديل
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    setProducts(products.filter((p) => p.id !== product.id))
                  }
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // 🧾 حفظ التعديلات أو الإضافة
  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? formData : p))
      );
    } else {
      const newProduct = {
        ...formData,
        id: products.length + 1,
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
  };

  return (
    <div className="d-flex" dir="rtl">
      {/* Sidebar */}
      <div
        className=" text-white vh-100 p-3"
        style={{ width: '250px' }}
      >
        <h4 className="mb-4">لوحة التحكم</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${
                currentView === 'overview' ? 'btn-light text-dark' : 'btn-dark'
              }`}
              onClick={() => setCurrentView('overview')}
            >
              نظرة عامة
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${
                currentView === 'products' ? 'btn-light text-dark' : 'btn-dark'
              }`}
              onClick={() => setCurrentView('products')}
            >
              المنتجات
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        {currentView === 'overview' && <OverviewView />}
        {currentView === 'products' && <ProductsView />}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between border border-2">
                <h5 className="modal-title">
                  {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                </h5>
                <button
                  type="button"
                  className="btn "
                  onClick={() => setShowModal(false)}
                ><i class="fa-solid fa-xmark"></i></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">اسم المنتج</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">السعر</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">الفئة</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="">اختر الفئة</option>
                      <option>تيشيرتات</option>
                      <option>قمصان</option>
                      <option>بناطيل</option>
                      <option>محافظ</option>
                      <option>حقائب</option>
                      <option>عطور</option>
                      <option>نظارات شمسية</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">الوصف</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  إلغاء
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
