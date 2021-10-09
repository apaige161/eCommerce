
import dotenv from 'dotenv';

//read from .env file
dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};