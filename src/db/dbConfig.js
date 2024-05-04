import mongoose from "mongoose";

export default async function connect() {
  const db_url = process.env.MONGO_DB;
  try {
    await mongoose.connect(db_url).then(() => {
      console.log("Mongodb connected");
      return { message: "Successfully connected", status: 200 };
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}
