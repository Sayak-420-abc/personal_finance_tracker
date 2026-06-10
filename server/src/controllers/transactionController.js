import Transaction from '../models/Transaction.js';

/**
 * GET /api/transactions
 * Supports query filters: ?type=expense&month=2024-06&category=<id>
 */
export async function getAll(req, res, next) {
  try {
    const { type, month, category, page = 1, limit = 20 } = req.query;
    const filter = { userId: req.userId };

    if (type) filter.type = type;
    if (category) filter.categoryId = category;
    if (month) {
      // month format: YYYY-MM
      const [year, mon] = month.split('-').map(Number);
      filter.date = {
        $gte: new Date(year, mon - 1, 1),
        $lt: new Date(year, mon, 1),
      };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .populate('categoryId', 'name color icon')
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Transaction.countDocuments(filter),
    ]);

    res.json({
      transactions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/transactions/:id
 */
export async function getById(req, res, next) {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).populate('categoryId', 'name color icon');

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/transactions
 */
export async function create(req, res, next) {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.userId,
    });

    const populated = await transaction.populate('categoryId', 'name color icon');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/transactions/:id
 */
export async function update(req, res, next) {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name color icon');

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/transactions/:id
 */
export async function remove(req, res, next) {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
}
