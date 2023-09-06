import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

// loads our enviroment variable
dotenv.config();

// start server
const PORT =
  process.env.NODE_ENV === "production" ? process.env.PORT || 5000 : 8000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "commentDB",
};

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI as string, options)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });
  })
  .catch((err: Error) => {
    console.log(
      "MongoDB connection error! Please make sure the database is running."
    );
    process.exit(1); // closes the database
  });
