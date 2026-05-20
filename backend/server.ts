import app from './src/app';
import connectDB from './src/config/db';
import { ENV } from './src/config/env';

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(
        `Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();