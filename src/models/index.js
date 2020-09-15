import mongoose from 'mongoose';
 
import User from './user';
import Message from './message';
 
const connectDb = (databaseUrl) => {
  return mongoose.connect(databaseUrl);
};

const disconnectDb = () => {
  return mongoose.connection.close();
};

const models = { User, Message };
 
export { connectDb, disconnectDb };
 
export default models;