import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faBan,
  faUserCog,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getUserList } from "../../../redux/thunk/users";
import { userActions } from "../../../redux/slices/user";
import { fireEvent } from "@testing-library/react";

function UserList() {
  const [editedUserId, setEditedUserId] = useState<string | null>(null);
  // const [bannedUsers, setBannedUsers] = useState<string[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.userList.users);

  const isLoading = useSelector((state: RootState) => state.userList.isLoading);

  const currentUser = useSelector(
    (state: RootState) => state.user.userInformation
  );

  const excludeMe = userList.filter((user) => user._id !== currentUser?._id);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleEdit = (userId: string) => {
    setEditedUserId(userId);
  };

  function handleBan(_id: string, isBanned: boolean, email: string): void {
    if (_id !== currentUser?._id) {
      const token = localStorage.getItem("userToken"); // token from local storage

      const url = `http://localhost:8000/api/v1/users/${_id}/update-restriction`;
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
            let status;
            isBanned === true ? (isBanned = false) : (isBanned = true);
            isBanned === true ? (status = "Banned") : (status = "Unbanned");
            alert(`Successfully updated the status for ${email} to ${status} `);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log(error); //   onError(); // in case of expiry
            return;
          }
        });
    }
  }
  function handleChangeRole(_id: string, role: string, email: string): void {
    // if (_id !== currentUser?._id) {
    const token = localStorage.getItem("userToken"); // token from local storage

    const url = `http://localhost:8000/api/v1/users/${_id}/update-role`;
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
          role === "admin" ? (role = "user") : (role = "admin");

          alert(`Successfully updated the role for ${email} to ${role} `);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error); //   onError(); // in case of expiry
          return;
        }
      });
    // }
  }
  function handelDelete(userId: string): void {
    const token = localStorage.getItem("userToken"); // token from local storage

    const url = `http://localhost:8000/api/v1/users/${userId}`;
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
          console.log(error); //   onError(); // in case of expiry
          return;
        }
      });
  }
  if (isLoading) {
    return <div>loading...</div>;
  } else if (currentUser?.role !== "admin") {
    return <div>Restricted access!</div>;
  } else
    return (
      <div className="max-w-md mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
        <ul className="grid grid-cols-1 gap-4">
          {excludeMe.map((user) => (
            <li
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="text-lg font-semibold">
                  First Name:{user.firstName}
                </h3>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">
                  Role: {user.role} {/* change role */}
                  <button
                    className="text-gray-500 hover:text-red-700 mx-2"
                    title={
                      user.role === "admin"
                        ? "Demote to user" + user.firstName
                        : "Make admin " + user.firstName
                    }
                    onClick={() =>
                      handleChangeRole(user._id, user.role, user.email)
                    }
                  >
                    <FontAwesomeIcon icon={faUserCog} />
                  </button>
                </p>
                <p className="text-gray-600">
                  Banned: {user.isBanned ? "Yes" : "No"} {/* ban user */}
                  <button
                    className="text-gray-500 hover:text-red-700 mx-2"
                    title={
                      user.isBanned
                        ? "Unban " + user.firstName
                        : "Ban " + user.firstName
                    }
                    onClick={() =>
                      handleBan(user._id, user.isBanned, user.email)
                    }
                  >
                    {" "}
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                </p>
                <button
                  className="text-red-500 hover:text-red-700 mx-2"
                  title={"Delete"}
                  onClick={() => handelDelete(user._id)}
                >
                  {" "}
                  <FontAwesomeIcon icon={faRemove} />
                </button>
                {editedUserId === user._id ? (
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
                      onClick={() => handleEdit(user._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
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
