
import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { hideNotification } from "../../../redux/slices/notification";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { open, message, type } = useSelector((state:RootState) => state.notification);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideNotification());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Notifications;

// type Props = {
//   notifications: string[];
// };

// function Notifications({ notifications }: Props) {
//   return (
//     <div className="bg-white dark:bg-slate-800 p-2 rounded w-65">
//       <ul>
//         {notifications.map((notification, index) => (
//           <li
//             key={index}
//             className="mb-2 transform transition-transform hover:scale-105"
//           >
//             <div className="bg-blue-100 p-2 rounded-md">
//               <p className="text-blue-700">{notification}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Notifications;
