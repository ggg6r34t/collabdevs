import express, { Express } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import multer from "multer";

import "./config/passport";
import User from "./models/User";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import userRoutes from "./routes/userRoutes";
import { googleStrategy, jwtStrategy } from "./config/passport";
import replyRoutes from "./routes/replyRoutes";
import savedPostRoutes from "./routes/savedPostRoutes";

const app: Express = express();
app.use(express.json());

// middleware setup
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET!, // The non-null assertion operator (!) confirms the environment variable has a value.
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false while using local host (not secured)
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(jwtStrategy);
passport.use(googleStrategy);

// needs work, doesn't work as intended
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Configure multer to specify the storage location and file name
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Define the directory where uploaded files will be stored
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    // Define the file name for uploaded files (you can customize this)
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage });

// Example route that uses the multer middleware for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  // req.file contains information about the uploaded file
  // You can process it as needed (e.g., save to the database)
  res.json({ message: "File uploaded successfully" });
});

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes, commentRoutes);
app.use("/api/v1/savedposts", savedPostRoutes);
app.use("/api/v1/replies", replyRoutes);

// error handler
app.use(apiErrorHandler);

export default app;
