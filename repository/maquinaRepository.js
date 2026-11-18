import conexao from '../database/conexao.js';

export async function cadastrar(maquina) {
    const sql = 'INSERT INTO maquina (nome, patrimonio, status_maquina) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [maquina.nome, maquina.patrimonio, maquina.status_maquina]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM maquina';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM maquina WHERE id_maquina = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, maquina) {
    const sql = 'UPDATE maquina SET nome = ?, patrimonio = ?, status_maquina = ? WHERE id_maquina = ?';
    const [resultado] = await conexao.execute(sql, [maquina.nome, maquina.patrimonio, maquina.status_maquina, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM maquina WHERE id_maquina = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}

