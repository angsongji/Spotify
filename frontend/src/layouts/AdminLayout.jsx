import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";
import {
    HiOutlineMusicNote,
    HiOutlineCollection,
} from "react-icons/hi";
import {
    UserOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import PopupMenu from "../components/PopupMenu";
const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = () => {

    const [user, setUser] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const accountId = decoded.user_id; // hoặc decoded.account_id tùy backend
            console.log("AccountId: ",accountId)

            // Gọi API để lấy thông tin user
            axios
                .get(`http://localhost:8000/api/user/by-account/${accountId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching user info", err);
                });
        } catch (error) {
            console.error("Invalid token", error);
        }
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sider collapsible>
                <div style={{ height: 64, display: "flex", justifyContent: "center", color: "#fff", margin: "24px 0" }}>
                    <img src="/logo1.svg" className="w-full h-auto" alt="Logo" />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} className="">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/admin">Người dùng</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<HiOutlineMusicNote />}>
                        <Link to="/admin/songs">Bài hát</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<HiOutlineCollection />}>
                        <Link to="/admin/albums">Albums</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<AiFillTags />}>
                        <Link to="/admin/categorys">Thể loại</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<SettingOutlined />}>
                        <Link to="/admin/roles">Phân quyền</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Main Layout */}
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 40px 0 40px",
                        textAlign: "center",
                        fontSize: 20,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <h1>Welcome!</h1>
                    <div className="flex gap-2 items-center">
                        <span className="text-lg">{user.name || "Loading..."}</span>
                        <PopupMenu />
                    </div>
                </Header>
                <Content style={{ margin: "16px", padding: "24px", background: "#fff" }}>
                    <Outlet /> {/* Hiển thị nội dung tương ứng với route */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
