import mongoose from 'mongoose';

const connectMongoDB = async () => {
    if (mongoose.connection.readyState >= 1) return mongoose.connection;

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'rateLimiterDB',
        });
        console.log('MongoDB connected');
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export default connectMongoDB;
