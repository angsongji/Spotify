import React, { useState, useEffect } from "react";
import axios from "axios";

const roleMap = {
  1: "admin",
  2: "user",
  3: "premium_user",
  4: "artist",
};

const roles = ["admin", "user", "premium_user", "artist"];

export default function RoleManager() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedRoles, setEditedRoles] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/").then((res) => {
      const mappedUsers = res.data.map((u) => ({
        id: u.id,
        name: u.name,
        role: roleMap[u.role],
      }));
      setUsers(mappedUsers);
    });
  }, []);

  const handleCheckboxChange = (userId, role) => {
    setEditedRoles((prev) => ({
      ...prev,
      [userId]: role,
    }));
  };

  const handleEdit = (userId) => {
    setEditUserId(userId);
    const currentRole = users.find((u) => u.id === userId)?.role;
    setEditedRoles((prev) => ({
      ...prev,
      [userId]: currentRole,
    }));
  };

  const handleSave = (userId) => {
    const updatedRole = editedRoles[userId];
  
    axios.post(`http://localhost:8000/api/users/${userId}/update-role/`, { role: updatedRole })
      .then((res) => {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, role: updatedRole } : user
          )
        );
        setEditUserId(null);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
        alert("Có lỗi khi cập nhật vai trò!");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý phân quyền người dùng</h1>
      <table className="w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">ID</th> {/* thêm dòng này */}
          <th className="p-3 text-left">Tên người dùng</th>
          {roles.map((role) => (
            <th key={role} className="p-3 text-center capitalize">
              {role.replace("_", " ")}
            </th>
          ))}
          <th className="p-3 text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const isEditing = editUserId === user.id;
          const selectedRole = editedRoles[user.id] ?? user.role;

          return (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50 text-center"
            >
              <td className="p-3 text-left">{user.id}</td> {/* thêm dòng này */}
              <td className="p-3 text-left">{user.name}</td>
              {roles.map((role) => (
                <td key={role} className="p-2">
                  <input
                    type="checkbox"
                    disabled={!isEditing}
                    checked={selectedRole === role}
                    onChange={() => handleCheckboxChange(user.id, role)}
                  />
                </td>
              ))}
              <td className="p-3">
                {isEditing ? (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleSave(user.id)}
                  >
                    Lưu
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    onClick={() => handleEdit(user.id)}
                  >
                    Sửa
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      </table>
    </div>
  );
}
