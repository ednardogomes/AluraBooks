import mongoose from 'mongoose';

export async function mongoConnection() {
  mongoose.connect(process.env.DB_STRING_CONECTION);
  return mongoose.connection;
}
