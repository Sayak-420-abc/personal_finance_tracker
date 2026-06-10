import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import * as ctrl from '../controllers/analyticsController.js';

const router = Router();

router.use(requireAuth);

router.get('/summary',              ctrl.getSummary);
router.get('/category-spending',    ctrl.getCategorySpending);
router.get('/monthly-spending',     ctrl.getMonthlySpending);
router.get('/spending-trend',       ctrl.getSpendingTrend);
router.get('/recent-transactions',  ctrl.getRecentTransactions);

export default router;
