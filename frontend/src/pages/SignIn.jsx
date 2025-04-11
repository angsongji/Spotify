import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      alert(
        `Đăng nhập thành công!\nID: ${data.id}\nUsername: ${data.username}`
      );
      navigate("/");
    } else {
      alert(data.error || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-800">
      <div className="bg-neutral-950 p-8 flex flex-col items-center justify-center rounded-lg shadow-md w-180">
        <img
          className="w-10 mb-5 h-10 mx-auto"
          src="../../public/logo1.svg"
          alt="logo"
        />
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-50">
          Đăng Nhập
        </h2>

        {/* Nút social login */}
        <div className="flex flex-col justify-center items-center">
          <button className="rounded-full flex items-center w-80 border text-center border-gray-400 font-bold cursor-pointer hover:border-white text-white px-3 py-2 mb-2">
            <img
              className="w-7 h-7 ml-4"
              src="../../public/logo-google.png"
              alt="logo-google"
            />
            <span className="px-7 w-60 text-white">Tiếp tục bằng Google</span>
          </button>
          <button className="rounded-full flex items-center w-80 border text-center border-gray-400 font-bold cursor-pointer hover:border-white text-white px-3 py-2 mb-8">
            <img
              className="w-7 h-7 ml-4"
              src="../../public/logo-facebook.png"
              alt="logo-facebook"
            />
            <span className="px-7 w-60 text-white">Tiếp tục bằng Facebook</span>
          </button>
        </div>

        <hr className="border-t-1 border-gray-500 w-140 mx-auto mt-5 mb-7" />

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="w-80">
          <div className="mb-2">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Tên người dùng
            </label>
            <input
              id="username"
              type="text"
              placeholder="Tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-white border-gray-400 border hover:border-white rounded-lg px-3 py-2 placeholder:text-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-white border-gray-400 border hover:border-white rounded-lg px-3 py-2 placeholder:text-gray-500"
              required
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-black cursor-pointer font-bold py-3 px-4 rounded-full w-full"
            type="submit"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="flex mt-10">
          <p className="text-gray-500">Bạn chưa có tài khoản? </p>
          <Link
            to="/sign-up"
            className="ml-2 text-white underline font-bold hover:text-green-600"
          >
            Đăng ký Spotify
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
