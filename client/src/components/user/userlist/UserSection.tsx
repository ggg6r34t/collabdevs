import UserList from "./UserList";

// sample user data
const users = [
  { id: 1, username: "user1", email: "user1@example.com" },
  { id: 2, username: "user2", email: "user2@example.com" },
  { id: 3, username: "user3", email: "user3@example.com" },
  { id: 4, username: "user1", email: "user1@example.com" },
  { id: 5, username: "user2", email: "user2@example.com" },
  { id: 6, username: "user3", email: "user3@example.com" },
];

function UserSection() {
  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

export default UserSection;
