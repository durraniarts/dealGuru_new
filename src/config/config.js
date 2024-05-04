// config/cloudinary.config.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOURDINARY_CLOUD_NAME,
  api_key: process.env.CLOURDINARY_API_KEY,
  api_secret: process.env.CLOURDINARY_SECRET_KEY,
});

export default { cloudinary };
