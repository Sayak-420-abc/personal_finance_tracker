import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createCategorySchema, updateCategorySchema } from '../schemas/categorySchema.js';
import * as ctrl from '../controllers/categoryController.js';

const router = Router();

router.use(requireAuth);

router.get('/',    ctrl.getAll);
router.post('/',   validate(createCategorySchema), ctrl.create);
router.put('/:id', validate(updateCategorySchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
