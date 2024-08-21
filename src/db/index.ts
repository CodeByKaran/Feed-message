import mongoose from "mongoose";

let isDbConnected = false;

const dbConnect = async (): Promise<void> => {
  if (isDbConnected) {
    console.log("Database is already connected.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URI || "");
    isDbConnected = true;
    console.log(`Database connected successfully: ${db.connection.host}`);
  } catch (error) {
    console.error("Database connection error!", error);
    process.exit(1);
  }
};

export { dbConnect };
