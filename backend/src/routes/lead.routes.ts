import { Router } from 'express';
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  exportCSV,
} from '../controllers/lead.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createLeadSchema,
  updateLeadSchema,
} from '../validations/lead.validation';

const router = Router();

router.use(protect);

router.get('/export/csv', exportCSV);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', validate(createLeadSchema), create);
router.put('/:id', validate(updateLeadSchema), update);
router.delete('/:id', authorizeRoles('admin'), remove);

export default router;