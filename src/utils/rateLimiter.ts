import { RateLimiterMongo } from 'rate-limiter-flexible';
import connectMongoDB from '@/services/mongo';

const initializeRateLimiter = async () => {
    const mongoConn = await connectMongoDB();

    return new RateLimiterMongo({
        storeClient: mongoConn.getClient(),
        points: 5, // 5 requests
        duration: 60, // per 60 seconds
        keyPrefix: 'shubham123',
    });
};

export default initializeRateLimiter;
