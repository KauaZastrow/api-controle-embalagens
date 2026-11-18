export class Operador {
    constructor(nome, matricula, turno){
        this.nome = nome;
        this.matricula = matricula;
        this.turno = turno;
    }
    
    validar(){
        if (typeof this.nome !== "string" || this.nome.trim().length < 3){
            throw new Error(`O nome deve ter pelo menos 3 caracteres.`)
        }

        if (this.matricula === null || this.matricula === undefined){
            throw new Error(`A matricula é obrigatorio.`)
        }

        if (this.turno === null || this.turno === undefined){
            throw new Error(`O turno não pode ficar vazio.`)
        }
    }

}