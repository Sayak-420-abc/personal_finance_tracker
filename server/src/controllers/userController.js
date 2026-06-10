import User from '../models/User.js';
import Category from '../models/Category.js';
import { DEFAULT_CATEGORIES } from '../constants/categories.js';

/**
 * POST /api/users/init
 * Webhook/manual endpoint to initialize a new user.
 * Creates the User doc and seeds default categories (idempotent).
 */
export async function initUser(req, res, next) {
  try {
    const { clerkId, email } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: 'clerkId and email are required' });
    }

    // Check if user already exists
    const existing = await User.findOne({ clerkId });
    if (existing) {
      return res.status(200).json({ message: 'User already initialized', user: existing });
    }

    // Create user
    const user = await User.create({ clerkId, email });

    // Seed default categories
    const categoryDocs = DEFAULT_CATEGORIES.map((cat) => ({
      userId: clerkId,
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
      isDefault: true,
    }));
    await Category.insertMany(categoryDocs);

    res.status(201).json({ message: 'User initialized', user });
  } catch (error) {
    next(error);
  }
}
