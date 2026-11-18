export class Maquina {
    constructor(nome, patrimonio, status){
        this.nome = nome;
        this.patrimonio = patrimonio;
        this.status = status;
    }
    
    validar(){
        if (typeof this.nome !== "string" || this.nome.trim().length < 3){
            throw new Error(`O nome deve ter pelo menos 3 caracteres.`)
        }

        if (this.patrimonio === null || this.patrimonio === undefined){
            throw new Error(`O patrimonio é obrigatorio.`)
        }

        if (this.status === null || this.status === undefined){
            throw new Error(`O status não pode ficar vazio.`)
        }
    }

}