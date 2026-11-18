import { Operador } from '../model/Operador.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/operadorRepository.js';
import { validarId } from '../utils/validarId.js';

export async function cadastrarOperador(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do operador em formato JSON.' });
    }

    const operador = new Operador(req.body.nome, req.body.matricula, req.body.turno);
    try {
        operador.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(operador);
        return res.status(201).json({ mensagem: 'Operador cadastrada com sucesso.', id_operador: id });
    } catch (erro) {
        console.error('Erro ao cadastrar operador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar operador.' });
    }
}

export async function listarOperadors(req, res) {
    try {
        const operadores = await listar();
        return res.status(200).json(operadores);
    } catch (erro) {
        console.error('Erro ao listar operadores:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar operadores.' });
    }
}

export async function buscarOperadorPorId(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const operador = await buscarPorId(id);
        if (!operador) {
            return res.status(404).json({ mensagem: 'Operador não encontrado.' });
        }
        return res.status(200).json(operador);
    } catch (erro) {
        console.error('Erro ao buscar operador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar operador.' });
    }
}

export async function atualizarOperador(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do operador em formato JSON.' });
    }
    if (!['nome', 'matricula', 'turno'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const operadorExistente = await buscarPorId(id);
        if (!operadorExistente) {
            return res.status(404).json({ mensagem: 'Operador não encontrado.' });
        }

        const operador = new Operador(
            req.body.nome !== undefined ? req.body.nome : operadorExistente.nome,
            req.body.matricula !== undefined ? req.body.matricula : operadorExistente.matricula,
            req.body.turno !== undefined ? req.body.turno : operadorExistente.turno
        );
        try {
            operador.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, operador);
        return res.status(200).json({ mensagem: 'Operador atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar operador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar operador.' });
    }
}

export async function deletarOperador(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const operador = await buscarPorId(id);
        if (!operador) {
            return res.status(404).json({ mensagem: 'Operador não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Operador não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Operador excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir operador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir operador.' });
    }
}
