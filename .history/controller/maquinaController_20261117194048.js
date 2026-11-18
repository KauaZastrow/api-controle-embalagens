import { Maquina } from '../model/Maquina.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/embalagemRepository.js';
import { validarId } from '../utils/validarId.js';

export async function cadastrarMaquina(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do embalagem em formato JSON.' });
    }

    const embalagem = new Maquina(req.body.descricao, req.body.material, req.body.capacidade);
    try {
        embalagem.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(embalagem);
        return res.status(201).json({ mensagem: 'Maquina cadastrada com sucesso.', id_embalagem: id });
    } catch (erro) {
        console.error('Erro ao cadastrar embalagem:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar embalagem.' });
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
        const embalagem = await buscarPorId(id);
        if (!embalagem) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }
        return res.status(200).json(embalagem);
    } catch (erro) {
        console.error('Erro ao buscar embalagem:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar embalagem.' });
    }
}

export async function atualizarMaquina(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do embalagem em formato JSON.' });
    }
    if (!['descricao', 'material', 'capacidade'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const embalagemExistente = await buscarPorId(id);
        if (!embalagemExistente) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }

        const embalagem = new Maquina(
            req.body.descricao !== undefined ? req.body.descricao : embalagemExistente.descricao,
            req.body.material !== undefined ? req.body.material : embalagemExistente.material,
            req.body.capacidade !== undefined ? req.body.capacidade : embalagemExistente.capacidade
        );
        try {
            embalagem.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, embalagem);
        return res.status(200).json({ mensagem: 'Maquina atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar embalagem:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar embalagem.' });
    }
}

export async function deletarMaquina(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const embalagem = await buscarPorId(id);
        if (!embalagem) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Maquina não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Maquina excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir embalagem:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir embalagem.' });
    }
}
