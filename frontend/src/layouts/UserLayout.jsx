import { Outlet, Link } from "react-router-dom";
import AppBar from "../components/user/AppBar";
import SideBar from "../components/user/SideBar";
import MusicQueue from "../components/user/MusicQueue";
import AudioBar from "../components/user/AudioBar";
import Footer from "../components/user/Footer";
import '../index.css';
const UserLayout = () => {
    return (
        <div className="bg-black flex flex-col h-screen">
            <div className="min-h-[10vh]">
                <AppBar />
            </div>

            <div className="flex-1 flex  px-2 gap-2">
                {/* Sidebar - Menu trái */}
                <div className="w-[22.22%] bg-[var(--dark-gray)]">
                    <SideBar />
                </div>

                {/* Main Content - Nội dung chính */}
                <div className="flex-1 overflow-y-auto h-[80vh]">
                    <Outlet /> {/* Nơi hiển thị các trang con theo đường dẫn cấu hình ở routes/index.jsx */}
                    <Footer />
                </div>

                {/* Right Panel - Panel phải */}
                <div className="w-1/5 bg-[var(--dark-gray)] ">
                    <MusicQueue />
                </div>
            </div>
            <div className="min-h-[10vh]">
                <AudioBar />
            </div>
        </div>
    );
};

export default UserLayout;
