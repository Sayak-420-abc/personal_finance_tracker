import clerkClient from '../config/clerk.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import { DEFAULT_CATEGORIES } from '../constants/categories.js';

/**
 * Clerk JWT verification middleware.
 * Verifies the Bearer token, extracts clerkId, and sets req.userId.
 * Also auto-initializes new users (creates User doc + seeds default categories).
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = await clerkClient.verifyToken(token);
    req.userId = payload.sub; // Clerk user ID

    // Auto-init: if user doesn't exist in DB yet, create + seed categories
    const existingUser = await User.findOne({ clerkId: req.userId });
    if (!existingUser) {
      // Fetch user details from Clerk
      let email = 'unknown@example.com';
      try {
        const clerkUser = await clerkClient.users.getUser(req.userId);
        email = clerkUser.emailAddresses?.[0]?.emailAddress || email;
      } catch {
        // Proceed with fallback email
      }

      await User.create({ clerkId: req.userId, email });

      // Seed default categories
      const categoryDocs = DEFAULT_CATEGORIES.map((cat) => ({
        userId: req.userId,
        name: cat.name,
        color: cat.color,
        icon: cat.icon,
        isDefault: true,
      }));
      await Category.insertMany(categoryDocs);
    }

    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}
