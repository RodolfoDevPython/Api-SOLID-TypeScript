import { uuid } from "uuidv4";

export class User {
    public readonly id: string;
    // Prefixo readonlyé usado para tornar uma propriedade somente leitura. Membros somente leitura podem ser acessados ​​fora da classe, mas seus valores não podem ser alterados. Como os membros somente leitura não podem ser alterados fora da classe, eles precisam ser inicializados na declaração ou dentro do construtor da classe.
    // referencia: https://www.tutorialsteacher.com/typescript/typescript-readonly
    public  name: string;
    public  email: string;
    public  password: string;

    constructor(props: Omit<User, 'id'>, id?: string) {
        //é a mesma forma de usar this.name = name
        //essa forma é mais curta para fazer essa atribuição
        Object.assign(this, props); 
        
        if (!id) {
            this.id = uuid();
        }

    }

}