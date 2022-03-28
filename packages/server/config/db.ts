import { connect } from 'mongoose';
import { DB } from '.';

const connectDB = async () => {
  try {
    await connect(DB);
    console.log('MongoDB is connected');
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};
