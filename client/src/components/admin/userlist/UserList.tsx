import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faBan,
  faUserCog,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { AppDispatch, RootState } from "../../../redux/store";
import { getUserList } from "../../../redux/thunk/users";
import useBanUser from "../../../hooks/userManagement/useBanUser";
import useChangeUserRole from "../../../hooks/userManagement/useChangeUserRole";
import useDeleteUser from "../../../hooks/userManagement/useDeleteUser";

function UserList() {
  const [editedUserId, setEditedUserId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.userList.users);
  const isLoading = useSelector((state: RootState) => state.userList.isLoading);

  const currentUser = useSelector(
    (state: RootState) => state.user.userInformation
  );

  // useUserSession hook to retrieve user session data
  // userId also exists in the deconstruction
  const { banUser } = useBanUser();
  const { changeUserRole } = useChangeUserRole();
  const { deleteUser } = useDeleteUser();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleEdit = (userId: string) => {
    setEditedUserId(userId);
  };

  // handleBan with the banUser hook
  const handleBan = (_id: string, isBanned: boolean, email: string) => {
    banUser(_id, isBanned, email);
  };

  // handleChangeRole with the changeUserRole hook
  const handleChangeRole = (_id: string, role: string, email: string) => {
    changeUserRole(_id, role, email);
  };

  // handleDelete with the deleteUser hook
  const handleDelete = (userId: string) => {
    deleteUser(userId);
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
                  First Name:{" "}
                  {user.firstName.charAt(0).toUpperCase() +
                    user.firstName.slice(1)}
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
