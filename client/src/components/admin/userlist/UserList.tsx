import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faBan,
  faUserCog,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/store";
import { getUserList } from "../../../redux/thunk/users";
import { BASE_URL } from "../../../api/api";

function UserList() {
  const [editedUserId, setEditedUserId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.userList.users);
  const isLoading = useSelector((state: RootState) => state.userList.isLoading);
  const currentUser = useSelector(
    (state: RootState) => state.user.userInformation
  );

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleEdit = (userId: string) => {
    setEditedUserId(userId);
  };

  const handleBan = (_id: string, isBanned: boolean, email: string) => {
    if (_id !== currentUser?._id) {
      const token = localStorage.getItem("userToken");
      const url = `${BASE_URL}/api/v1/users/${_id}/update-restriction`;

      axios
        .put(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            const status = isBanned ? "Unbanned" : "Banned";
            alert(`Successfully updated the status for ${email} to ${status}`);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log(error);
            return;
          }
        });
    }
  };

  const handleChangeRole = (_id: string, role: string, email: string) => {
    const token = localStorage.getItem("userToken");
    const url = `${BASE_URL}/api/v1/users/${_id}/update-role`;

    axios
      .put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          role = role === "admin" ? "user" : "admin";
          alert(`Successfully updated the role for ${email} to ${role}`);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
          return;
        }
      });
  };

  const handleDelete = (userId: string) => {
    const token = localStorage.getItem("userToken");
    const url = `${BASE_URL}/api/v1/users/${userId}`;

    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 403) {
          alert(`Successfully Deleted`);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
          return;
        }
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (currentUser?.role !== "admin") {
    return <div>Restricted access!</div>;
  } else {
    return (
      <div className="max-w-md mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
        <ul className="grid grid-cols-1 gap-4">
          {userList.map((user) => (
            <li
              key={user._id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex items-center"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="text-lg font-semibold">
                  First Name: {user.firstName}
                </h3>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">
                  Role: {user.role}
                  <button
                    className="text-gray-500 hover:text-red-700 mx-2"
                    title={`Toggle ${user.role === "admin" ? "user" : "admin"}`}
                    onClick={() =>
                      handleChangeRole(user._id, user.role, user.email)
                    }
                  >
                    <FontAwesomeIcon icon={faUserCog} />
                  </button>
                </p>
                <p className="text-gray-600">
                  Banned: {user.isBanned ? "Yes" : "No"}
                  <button
                    className="text-gray-500 hover:text-red-700 mx-2"
                    title={`${user.isBanned ? "Unban" : "Ban"} ${
                      user.firstName
                    }`}
                    onClick={() =>
                      handleBan(user._id, user.isBanned, user.email)
                    }
                  >
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                </p>
                <div className="flex flex-row">
                  <button
                    className="text-red-500 hover:text-red-700 mx-2"
                    title="Delete"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  {editedUserId === user._id ? (
                    <div>
                      <input type="text" placeholder="Edit username" />
                      <button onClick={() => setEditedUserId(null)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-2"
                        onClick={() => handleEdit(user._id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
