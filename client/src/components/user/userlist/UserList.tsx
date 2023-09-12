import { useState, useEffect } from "react";
import axios from "axios";

import { User } from "../../../type/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faUserCog } from "@fortawesome/free-solid-svg-icons";

type Props = {
  users: User[];
};

function UserList({ users }: Props) {
  const [editedUserId, setEditedUserId] = useState<number | null>(null);
  const [bannedUsers, setBannedUsers] = useState<number[]>([]);
  const [userRoles, setUserRoles] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    axios.get("/api/user-roles").then((response) => {
      setUserRoles(response.data);
    });
  }, []);

  const handleEdit = (userId: number) => {
    setEditedUserId(userId);
  };

  const handleBan = (userId: number) => {
    axios.post(`/api/ban-user/${userId}`).then((response) => {
      setBannedUsers([...bannedUsers, userId]);
    });
  };

  const handleChangeRole = (userId: number) => {
    const newRole = userRoles[userId] === "admin" ? "user" : "admin";

    axios
      .post(`/api/change-role/${userId}`, { role: newRole })
      .then((response) => {
        setUserRoles({ ...userRoles, [userId]: newRole });
      });
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
      <ul className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
              {editedUserId === user.id ? (
                // display edit form when editing
                <div>
                  <input type="text" placeholder="Edit username" />
                  <button
                    onClick={() => {
                      setEditedUserId(null);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                // display action buttons
                <div className="ml-auto">
                  {/* edit user */}
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {/* ban user */}
                  <button
                    className="text-red-500 hover:text-red-700 mx-2"
                    onClick={() => handleBan(user.id)}
                    disabled={bannedUsers.includes(user.id)}
                  >
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  {/* change role */}
                  <button
                    className="text-purple-500 hover:text-purple-700 mx-2"
                    onClick={() => handleChangeRole(user.id)}
                  >
                    <FontAwesomeIcon icon={faUserCog} />
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
