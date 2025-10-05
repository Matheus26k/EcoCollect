import { Router } from 'express';
import { AgendamentoController } from '../controllers/AgendamentoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const agendamentoController = new AgendamentoController();

router.post('/', agendamentoController.create);
router.get('/', authMiddleware, agendamentoController.list);
router.get('/protocolo/:protocolo', agendamentoController.getByProtocolo);
router.get('/:id', authMiddleware, agendamentoController.getById);
router.patch('/:id/status', authMiddleware, agendamentoController.updateStatus);
router.delete('/:id', authMiddleware, agendamentoController.delete);
router.get('/materiais/tipos', agendamentoController.getMaterialTypes);

export { router as agendamentoRoutes };