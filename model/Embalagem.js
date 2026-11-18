export class Embalagem {
    constructor (descricao, material, capacidade){
        this.descricao = descricao;
        this.material = material;
        this.capacidade = capacidade;
    }

    validar(){
        if (typeof this.descricao !== "string" || this.descricao.trim().length < 3){
            throw new Error(`A descrição deve ter pelo menos 3 caracteres.`)
        }

        if (typeof this.material !== "string" || this.material.trim().length < 1){
            throw new Error(`O material é obrigatorio.`)
        }

        if (this.capacidade < 0 || this.capacidade === null || this.capacidade === undefined){
            throw new Error(`A capacidade deverá ser um número maior que zero.`)
        }
    }
}