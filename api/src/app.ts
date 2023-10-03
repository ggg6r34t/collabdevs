import express, { Express } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import "./config/passport";
import User from "./models/User";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import { restoreSession } from "./middlewares/restoreSession";
import userRoutes from "./routes/userRoutes";
import {
  githubStrategy,
  googleStrategy,
  jwtStrategy,
  twitterStrategy,
} from "./config/passport";
import replyRoutes from "./routes/replyRoutes";
import savedPostRoutes from "./routes/savedPostRoutes";

const SESSION_SECRET = process.env.SESSION_SECRET!;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const PORT = 15397;

const app: Express = express();

export const redisClient = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: PORT,
  },
});

redisClient.connect();

redisClient.on("error", function (err) {
  console.error("Could not establish a connection with redis. " + err);
});

redisClient.on("connect", function () {
  console.log("Connected to Redis successfully");
});

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
}

const corsOptions = {
  origin: [process.env.DEV_ORIGIN!, process.env.PROD_ORIGIN!], // our frontend URL
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
  exposedHeaders: ["Authorization", "X-Custom-Header"],
};

// middleware setup
app.use(cors(corsOptions));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: process.env.NODE_ENV === "production", // set to true in a production environment with HTTPS
      secure: process.env.NODE_ENV === "production", // set to true in a production environment with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    genid: (req) => {
      const uuid = uuidv4();
      return uuid;
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(jwtStrategy);
passport.use(twitterStrategy);
passport.use(githubStrategy);
passport.use(googleStrategy);

// serialize user into the session
passport.serializeUser((user: any, done) => {
  done(null, user?._id);
});

// deserialize user from the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(null, false);
    }

    done(null, user); // user found and deserialized
  } catch (error) {
    done(error, false);
  }
});

// restoreSession user session
app.use(restoreSession);

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes, commentRoutes);
app.use("/api/v1/savedposts", savedPostRoutes);
app.use("/api/v1/replies", replyRoutes);

// error handler
app.use(apiErrorHandler);

export default app;
