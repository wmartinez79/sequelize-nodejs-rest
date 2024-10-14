import { createClient }  from 'redis';

// const url = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient();

redisClient.on('connect', function() {
    console.log('Connected!');
  });

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

const initializeRedis = async () => {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  }
export const cache = {
    get: async (key: string): Promise<string | null> => {
        try {
            await initializeRedis();
            const data = await redisClient.get(key);
            return data;
        } catch (err) {
          console.error('Error getting data from Redis:', err);
          return null; // or throw an error based on your needs
        }
      },
      
    set: async (key: string, value: string): Promise<void> => {
        try {
            await initializeRedis();
            await redisClient.set(key, value);
        } catch (err) {
            console.error('Error setting data in Redis:', err);
        }
    },
};
