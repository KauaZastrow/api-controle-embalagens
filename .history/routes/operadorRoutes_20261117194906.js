import express from 'express';
import {
    atualizarMaquina,
    buscarMaquinaPorId,
    cadastrarMaquina,
    deletarMaquina,
    listarOperadores
} from '../controller/maquinaController.js';

const router = express.Router();

router.post('/', cadastrarMaquina);
router.get('/', listarOperadores);
router.get('/:id', buscarMaquinaPorId);
router.patch('/:id', atualizarMaquina);
router.delete('/:id', deletarMaquina);

export default router;