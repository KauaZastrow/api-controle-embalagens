import express from 'express';
import {
    atualizarAnalista,
    buscarAnalistaPorId,
    cadastrarAnalista,
    deletarAnalista,
    listarEmbalagens
} from '../controller/analistaController.js';

const router = express.Router();

router.post('/', cadastrarAnalista);
router.get('/', listarEmbalagens);
router.get('/:id', buscarAnalistaPorId);
router.patch('/:id', atualizarAnalista);
router.delete('/:id', deletarAnalista);

export default router;
