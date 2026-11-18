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

        if (typeof this.matricula !== "string" || this.matricula.trim().length < 1){
            throw new Error(`A matricula é obrigatorio.`)
        }

        if (typeof this.turno !== "string" || this.matricula.trim().length < 1){
            throw new Error(`O turno não pode ficar vazio.`)
        }
    }

}