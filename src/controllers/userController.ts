import { Request, Response } from 'express';
import { cache } from '../services/cacheServices';
import User from '../db/models/user';
import { validationResult } from 'express-validator';

// Controller function to get a user by ID
export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    // Try to get user from Redis cache
    const cachedUser = await cache.get(`user_${userId}`);
    if (cachedUser) {
        console.log('cachedUser ', cachedUser);
      res.status(200).json(JSON.parse(cachedUser)); // Return cached user
    } else {
    // Fetch from the database if not cached
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            // Cache the user for future requests
            await cache.set(`user_${userId}`, JSON.stringify(user));
            res.status(200).json(user); // Return the user from the database
        }
    }
  } catch (error) {
    console.error('Error getting the user:', error);
    res.status(500).json({ message: 'Error retrieving user from the database' });
  }
};

// Controller function to register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        // Create a new user in the database
        const user = await User.create(req.body);

        res.status(201).json(user); // Respond with the created user
    }
  } catch (error) {
    console.error('Error saving the user:', error);
    res.status(500).json({ message: 'Error retrieving user from the database' });
  }
};
