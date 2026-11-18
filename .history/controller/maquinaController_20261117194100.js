import { Maquina } from '../model/Maquina.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/maquinaRepository.js';
import { validarId } from '../utils/validarId.js';

export async function cadastrarMaquina(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do maquina em formato JSON.' });
    }

    const maquina = new Maquina(req.body.descricao, req.body.material, req.body.capacidade);
    try {
        maquina.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(maquina);
        return res.status(201).json({ mensagem: 'Maquina cadastrada com sucesso.', id_maquina: id });
    } catch (erro) {
        console.error('Erro ao cadastrar maquina:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar maquina.' });
    }
}

export async function listarMaquinas(req, res) {
    try {
        const maquinas = await listar();
        return res.status(200).json(maquinas);
    } catch (erro) {
        console.error('Erro ao listar maquinas:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar maquinas.' });
    }
}

export async function buscarMaquinaPorId(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const maquina = await buscarPorId(id);
        if (!maquina) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }
        return res.status(200).json(maquina);
    } catch (erro) {
        console.error('Erro ao buscar maquina:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar maquina.' });
    }
}

export async function atualizarMaquina(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do maquina em formato JSON.' });
    }
    if (!['descricao', 'material', 'capacidade'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const maquinaExistente = await buscarPorId(id);
        if (!maquinaExistente) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }

        const maquina = new Maquina(
            req.body.descricao !== undefined ? req.body.descricao : maquinaExistente.descricao,
            req.body.material !== undefined ? req.body.material : maquinaExistente.material,
            req.body.capacidade !== undefined ? req.body.capacidade : maquinaExistente.capacidade
        );
        try {
            maquina.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, maquina);
        return res.status(200).json({ mensagem: 'Maquina atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar maquina:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar maquina.' });
    }
}

export async function deletarMaquina(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const maquina = await buscarPorId(id);
        if (!maquina) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Maquina excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir maquina:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir maquina.' });
    }
}
