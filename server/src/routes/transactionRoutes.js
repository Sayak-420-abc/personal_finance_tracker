import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createTransactionSchema, updateTransactionSchema } from '../schemas/transactionSchema.js';
import * as ctrl from '../controllers/transactionController.js';

const router = Router();

router.use(requireAuth);

router.get('/',    ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/',   validate(createTransactionSchema), ctrl.create);
router.put('/:id', validate(updateTransactionSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
