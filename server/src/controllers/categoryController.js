import Category from '../models/Category.js';
import Transaction from '../models/Transaction.js';

/**
 * GET /api/categories
 */
export async function getAll(req, res, next) {
  try {
    const categories = await Category.find({ userId: req.userId }).sort({ isDefault: -1, name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/categories
 */
export async function create(req, res, next) {
  try {
    const category = await Category.create({
      ...req.body,
      userId: req.userId,
      isDefault: false,
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/categories/:id
 */
export async function update(req, res, next) {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/categories/:id
 * Prevents deletion if transactions reference this category.
 */
export async function remove(req, res, next) {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if any transactions use this category
    const txnCount = await Transaction.countDocuments({ categoryId: req.params.id });
    if (txnCount > 0) {
      return res.status(400).json({
        error: `Cannot delete category: ${txnCount} transaction(s) reference it. Reassign them first.`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
}
