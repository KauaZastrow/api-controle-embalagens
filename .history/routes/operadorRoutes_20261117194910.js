import express from 'express';
import {
    atualizarOperador,
    buscarOperadorPorId,
    cadastrarOperador,
    deletarOperador,
    listarOperadores
} from '../controller/maquinaController.js';

const router = express.Router();

router.post('/', cadastrarOperador);
router.get('/', listarOperadores);
router.get('/:id', buscarOperadorPorId);
router.patch('/:id', atualizarOperador);
router.delete('/:id', deletarOperador);

export default router;