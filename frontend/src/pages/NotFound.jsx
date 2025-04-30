import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-7xl font-bold text-red-500">❌ 404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Không tìm thấy trang</h2>
      <p className="mt-2 text-gray-600">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
