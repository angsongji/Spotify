import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setVerificationSent(true); // hiển thị giao diện thông báo
    } else {
      alert(data.error || "Tạo tài khoản thất bại!");
    }
  };

  if (verificationSent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-800">
        <div className="bg-neutral-950 p-10 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Xác nhận email</h2>
          <p className="text-gray-300 max-w-md">
            Chúng tôi đã gửi một email xác nhận đến{" "}
            <span className="font-semibold text-white">{email}</span>. Vui lòng
            kiểm tra hộp thư và nhấp vào liên kết xác nhận để kích hoạt tài
            khoản.
          </p>
          <Link
            to="/sign-in"
            className="text-green-500 underline mt-6 block hover:text-green-400"
          >
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-800">
      <div className="bg-neutral-950 p-8 flex flex-col items-center justify-center rounded-lg shadow-md w-180">
        <img
          className="w-10 mb-5 h-10 mx-auto"
          src="../../public/logo1.svg"
          alt="logo"
        />
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-50">
          Đăng ký để bắt đầu nghe
        </h2>
        <form className="w-80" onSubmit={handleRegister}>
          <div className="mb-2">
            <label className="block text-white text-sm font-bold mb-2">
              Địa chỉ email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-white border-gray-400 border hover:border-white rounded-lg px-3 py-2 placeholder:text-gray-500"
              type="email"
              placeholder="name@domain.com"
              required
            />
          </div>
          <div className="mb-6 mt-3">
            <label className="block text-white text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-white border-gray-400 border hover:border-white rounded-lg px-3 py-2 placeholder:text-gray-500"
              type="password"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-black cursor-pointer font-bold py-3 px-4 mt-5 rounded-full w-full"
            type="submit"
          >
            Tiếp theo
          </button>
        </form>

        <div className="flex items-center my-4 w-100">
          <hr className="flex-grow border-t-1 ml-10 border-gray-500" />
          <span className="mx-4 text-white">hoặc</span>
          <hr className="flex-grow border-t mr-10 border-gray-500" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <button className="rounded-full flex items-center w-80 border text-center border-gray-400 font-bold cursor-pointer hover:border-white text-white px-3 py-2 mb-2">
            <img
              className="w-7 h-7 ml-4"
              src="../../public/logo-google.png"
              alt="logo-google"
            />
            <span className="px-7 w-60 text-white">Đăng ký bằng Google</span>
          </button>
          <button className="rounded-full flex items-center w-80 border text-center border-gray-400 font-bold cursor-pointer hover:border-white text-white px-3 py-2 mb-8">
            <img
              className="w-7 h-7 ml-4"
              src="../../public/logo-facebook.png"
              alt="logo-facebook"
            />
            <span className="px-7 w-60 text-white">Đăng ký bằng Facebook</span>
          </button>
        </div>

        <hr className="border-t-1 border-gray-800 w-80 mx-auto" />
        <div className="flex mt-10">
          <p className="text-gray-500">Bạn đã có tài khoản?</p>
          <Link
            to="/sign-in"
            className="ml-2 text-white underline font-bold hover:text-green-600"
          >
            Đăng nhập tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
