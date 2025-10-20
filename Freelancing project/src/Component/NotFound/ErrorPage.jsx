// export default function NotFound() {
//     return (
//       <div style={{ textAlign: 'center', padding: '50px' }}>
//         <h1>404 - الصفحة غير موجودة 😢</h1>
//         <p>الرابط اللي دخلته مش موجود، تأكد من صحته.</p>
//         <a href="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
//           الرجوع للصفحة الرئيسية
//         </a>
//       </div>
//     );
//   }
  // components/ErrorPage.jsx
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error); // لتسجيل تفاصيل الخطأ في وحدة التحكم

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>عذرًا، حدث خطأ!</h1>
      <p>
        {error.statusText || error.message || 'الصفحة غير موجودة (404)'}
      </p>
      <a href="/">العودة إلى الصفحة الرئيسية</a>
    </div>
  );
}

export default ErrorPage;