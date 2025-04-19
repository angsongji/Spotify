const EmailVerified = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-800">
      <div className="bg-neutral-950 p-10 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Xác thực email thành công!
        </h2>
        <p className="text-gray-300 max-w-md">
          Bạn đã xác thực tài khoản thành công. Giờ bạn có thể đăng nhập và bắt
          đầu nghe nhạc.
        </p>
        <a
          href="/sign-in"
          className="text-green-500 underline mt-6 block hover:text-green-400"
        >
          Đăng nhập ngay
        </a>
      </div>
    </div>
  );
};

export default EmailVerified;
