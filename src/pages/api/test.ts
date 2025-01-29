import type { NextApiRequest, NextApiResponse } from 'next';
import initializeRateLimiter from '@/utils/rateLimiter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rateLimiter = await initializeRateLimiter();

        // Encrypt or hash IP if needed
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';

        await rateLimiter.consume(ip as string); // Deduct 1 point

        res.status(200).json({ message: 'API response successful!' });
    } catch (error) {
        res.status(429).json({ error: 'Too many requests, please try again later.' });
    }
}
