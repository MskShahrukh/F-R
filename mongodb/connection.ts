import mongoose from 'mongoose';

export const databaseConnection = async () => {
  const dbUser = `db-user`;
  const dbPass = `db-user-pass`;
  const dbUrl = `cluster0.ttpmuvz.mongodb.net/mongoose`;

  return await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@${dbUrl}?authSource=admin`
  );
};
