export class Maquina {
    constructor(nome, patrimonio, status_maquina){
        this.nome = nome;
        this.patrimonio = patrimonio;
        this.status_maquina = status_maquina;
    }
    
    validar(){
        if (typeof this.nome !== "string" || this.nome.trim().length < 3){
            throw new Error(`O nome deve ter pelo menos 3 caracteres.`)
        }

        if (this.patrimonio === null || this.patrimonio === undefined){
            throw new Error(`O patrimonio é obrigatorio.`)
        }

        if (typeof this.status_maquina !== "string" || this.status_maquina.trim().length < 3){
            throw new Error(`O status_maquina não pode ficar vazio.`)
        }
    }

}