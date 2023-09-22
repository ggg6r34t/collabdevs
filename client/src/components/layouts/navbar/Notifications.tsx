type Props = {
  notifications: string[];
};

function Notifications({ notifications }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 p-2 rounded w-65">
      <ul>
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="mb-2 transform transition-transform hover:scale-105"
          >
            <div className="bg-blue-100 p-2 rounded-md">
              <p className="text-blue-700">{notification}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
