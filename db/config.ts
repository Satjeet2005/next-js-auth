import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI!}/${process.env.DB_NAME}`);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (e) => {
      console.log("Error in connecting to the mongoDB", e);
      process.exit();
    });
  } catch (e) {
    console.log("Something went wrong while connecting to mongoDB", e);
  }
};

export default connect;
