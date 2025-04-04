import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button, Input, Form, message } from 'antd';
import { HiKey } from 'react-icons/hi';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

function PopupMenu() {
    const [activeForm, setActiveForm] = useState(null); // Quản lý form đang mở
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        const selectedKey = e.key;
        
        // Kiểm tra xem mục đã chọn là mục đang mở hay chưa
        if (selectedKey === activeForm) {
            setActiveForm(null); // Nếu đã mở thì ẩn form
        } else {
            setActiveForm(selectedKey); // Cập nhật form đang mở
        }

        // Nếu chọn "Đăng xuất", thực hiện điều hướng
        if (selectedKey === '3') {
            navigate('/', { replace: true }); // Chuyển hướng khi đăng xuất
        }
    };

    const handleUpdateAccount = () => {
        message.success('Thông tin đã được cập nhật!');
    };

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu mới không khớp!');
            return;
        }
        message.success('Mật khẩu đã được đổi thành công!');
    };

    return (
        <div>
            {/* Menu */}
            <Menu onClick={handleMenuClick} selectedKeys={[activeForm]} items={[
                { key: '1', label: 'Tài khoản', icon: <UserOutlined /> },
                { key: '2', label: 'Đổi mật khẩu', icon: <HiKey /> },
                { key: '3', label: 'Đăng xuất', icon: <LogoutOutlined /> },
            ]} />

            {/* Hiển thị form tài khoản */}
            {activeForm === '1' && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Thông tin tài khoản</h3>
                    <Form layout="vertical">
                        <Form.Item label="Tên">
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Nhập tên mới"
                            />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Nhập email mới"
                            />
                        </Form.Item>
                        <Form.Item label="Avatar URL">
                            <Input
                                value={newAvatar}
                                onChange={(e) => setNewAvatar(e.target.value)}
                                placeholder="Nhập URL của avatar mới"
                            />
                        </Form.Item>
                        <Button type="primary" onClick={handleUpdateAccount}>
                            Cập nhật thông tin
                        </Button>
                    </Form>
                </div>
            )}

            {/* Hiển thị form đổi mật khẩu */}
            {activeForm === '2' && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Đổi mật khẩu</h3>
                    <Form layout="vertical">
                        <Form.Item label="Mật khẩu hiện tại">
                            <Input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Nhập mật khẩu hiện tại"
                            />
                        </Form.Item>
                        <Form.Item label="Mật khẩu mới">
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới"
                            />
                        </Form.Item>
                        <Form.Item label="Nhập lại mật khẩu mới">
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu mới"
                            />
                        </Form.Item>
                        <Button type="primary" onClick={handleUpdatePassword}>
                            Đổi mật khẩu
                        </Button>
                    </Form>
                </div>
            )}

            {/* Đăng xuất */}
            {activeForm === '3' && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Bạn có chắc chắn muốn đăng xuất không?</h3>
                    <Button type="primary" onClick={() => navigate('/', { replace: true })}>
                        Đăng xuất
                    </Button>
                </div>
            )}
        </div>
    );
}

export default PopupMenu;
