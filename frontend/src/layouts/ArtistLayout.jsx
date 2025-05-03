import { useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { HiOutlineMusicNote, HiOutlineCollection } from "react-icons/hi";
import { jwtDecode } from "jwt-decode"; // ✅ Sửa lại default import
import { useEffect, useState } from "react";
import axios from "axios";
import '../index.css';

const { Header, Sider, Content } = Layout;

const ArtistLayout = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("access");
    let accountId = null;
    try {
        if (token) {
            const decoded = jwtDecode(token);
            accountId = decoded.account_id || decoded.user_id || null;
        }
    } catch (error) {
        console.error("Invalid token", error);
    }

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (accountId) {
            axios.get(`http://localhost:8000/api/user/by-account/${accountId}/`)
                .then(res => {
                    setUser(res.data); // Cập nhật thông tin user
                })
                .catch(err => {
                    console.error("Lỗi khi lấy thông tin user:", err);
                });
        }
    }, [accountId]);

    const menuItems = [
        {
            key: "1",
            icon: <HiOutlineMusicNote />,
            label: <Link to="/artist">Bài hát</Link>,
        },
        {
            key: "2",
            icon: <HiOutlineCollection />,
            label: <Link to="/artist/albums">Albums</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
            <div className="flex flex-col justify-center items-center my-5"> {/* Thêm flex-col để sắp xếp theo chiều dọc */}
                {/* Hiển thị avatar */}
                <img
                    onClick={() => navigate("/", { replace: true })}
                    src={user ? user.avatar || "https://via.placeholder.com/150" : "https://via.placeholder.com/150"} // Sử dụng avatar nếu có, nếu không dùng ảnh mặc định
                    className="rounded-full w-[50%] cursor-pointer"
                    alt="Avatar"
                />
                {user && (
                    <div className="text-center mt-2 text-white"> {/* Dùng text-white để chữ trắng */}
                        <span className="text-lg">{user.name}</span> {/* Hiển thị tên người dùng */}
                    </div>
                )}
            </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
            </Sider>

            <Layout>
                <Header style={{ background: "#fff", padding: "0 40px", display: "flex", justifyContent: "space-between" }}>
                    <h1>Welcome!</h1>
                </Header>
                <Content style={{ margin: "16px", padding: "24px", background: "#fff" }}>
                    <Outlet context={{ accountId }} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default ArtistLayout;
