import mongoose from "mongoose";
const connectionUrl = process.env.MONGO_URL_1 as string;
// mongoose
//   .connect("mongodb://127.0.0.1:27017/test")
//   .then(() => console.log("Connected!"));
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(connectionUrl);
    console.log("connected success full");
    return connection;
  } catch (err) {
    console.log("db connection fail ", err);
  }
};
export default dbConnect;
