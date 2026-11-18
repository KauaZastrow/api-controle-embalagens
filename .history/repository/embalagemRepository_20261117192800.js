import conexao from '../database/conexao.js';

export async function cadastrar(embalagem) {
    const sql = 'INSERT INTO embalagem (descricao, material, especialidade) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [embalagem.descricao, embalagem.material, embalagem.especialidade]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM embalagem';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM embalagem WHERE id_embalagem = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, embalagem) {
    const sql = 'UPDATE embalagem SET descricao = ?, material = ?, especialidade = ? WHERE id_embalagem = ?';
    const [resultado] = await conexao.execute(sql, [embalagem.descricao, embalagem.material, embalagem.especialidade, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM embalagem WHERE id_embalagem = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}

