import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const mockProducts = [
  { id: 1, name: 'تيشيرت بولو تومي احمر', price: 500, category: 'تيشيرتات', stock: 15, sales: 25, status: 'متوفر' },
  { id: 2, name: 'قميص شمواه جملي', price: 450, category: 'قمصان', stock: 8, sales: 18, status: 'متوفر' },
  { id: 3, name: 'محفظة جلد بني', price: 480, category: 'محافظ', stock: 0, sales: 12, status: 'نفذ المخزون' },
  { id: 4, name: 'عطر ساوفاج', price: 500, category: 'عطور', stock: 5, sales: 30, status: 'متوفر' },
];

const mockOrders = [
  { id: 1, customer: 'أحمد محمد', total: 950, status: 'مكتمل', date: '2024-01-15' },
  { id: 2, customer: 'فاطمة علي', total: 450, status: 'قيد التجهيز', date: '2024-01-14' },
  { id: 3, customer: 'محمد حسن', total: 1200, status: 'مكتمل', date: '2024-01-13' },
  { id: 4, customer: 'نور الدين', total: 800, status: 'قيد الشحن', date: '2024-01-12' },
];

const mockStats = {
  totalProducts: 40,
  totalOrders: 156,
  totalRevenue: 45600,
  totalCustomers: 89,
};

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const renderStats = () => (
    <div className="row mb-4">
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">إجمالي المنتجات</h5>
            <p className="card-text">{mockStats.totalProducts}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">إجمالي الطلبات</h5>
            <p className="card-text">{mockStats.totalOrders}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">إجمالي الإيرادات</h5>
            <p className="card-text">{mockStats.totalRevenue.toLocaleString()} ج.م</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">العملاء</h5>
            <p className="card-text">{mockStats.totalCustomers}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const OverviewView = () => (
    <div>
      <h3 className="mb-4">نظرة عامة</h3>
      {renderStats()}
      <div className="row">
        <div className="col-md-8 mb-4">
          <h5>أحدث الطلبات</h5>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العميل</th>
                <th>المبلغ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total} ج.م</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 mb-4">
          <h5>المنتجات الأكثر مبيعاً</h5>
          <ul className="list-group">
            {mockProducts.map((product, index) => (
              <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                {product.name}
                <span className="badge bg-primary rounded-pill">{product.sales} مبيعة</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const ProductsView = () => (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3>إدارة المنتجات</h3>
        <button className="btn btn-dark" onClick={() => setShowModal(true)}>
          إضافة منتج جديد
        </button>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الفئة</th>
            <th>السعر</th>
            <th>المخزون</th>
            <th>المبيعات</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {mockProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price} ج.م</td>
              <td>{product.stock}</td>
              <td>{product.sales}</td>
              <td>{product.status}</td>
              <td>
                <button className="btn btn-sm btn-secondary me-1" onClick={() => { setEditingProduct(product); setShowModal(true); }}>تعديل</button>
                <button className="btn btn-sm btn-danger">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="d-flex" dir="rtl">
      {/* Sidebar */}
      <div className=" text-white vh-100 p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">لوحة التحكم</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={() => setCurrentView('overview')}>نظرة عامة</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={() => setCurrentView('products')}>المنتجات</button>
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
              <div className="modal-header">
                <h5 className="modal-title">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">اسم المنتج</label>
                  <input type="text" className="form-control" defaultValue={editingProduct?.name || ''}/>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">السعر</label>
                    <input type="number" className="form-control" defaultValue={editingProduct?.price || ''}/>
                  </div>
                  <div className="col">
                    <label className="form-label">المخزون</label>
                    <input type="number" className="form-control" defaultValue={editingProduct?.stock || ''}/>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">الفئة</label>
                  <select className="form-select" defaultValue={editingProduct?.category || ''}>
                    <option>تيشيرتات</option>
                    <option>قمصان</option>
                    <option>بناطيل</option>
                    <option>محافظ</option>
                    <option>حقائب</option>
                    <option>عطور</option>
                    <option>نظارات شمسية</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">وصف المنتج</label>
                  <textarea className="form-control" rows="4" defaultValue={editingProduct?.description || ''}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
                <button className="btn btn-primary">{editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
