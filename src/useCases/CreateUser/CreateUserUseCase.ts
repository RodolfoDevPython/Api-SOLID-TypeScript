import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProviders";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

/* 
AQUITETURA APLICADA SOLID

Single responsability principle pq só faz uma unica coisa que é salvar o usuario

*/
export class CreateUserUseCase {

    constructor(
        // L -> Ele vai mostrar um modelo de como deve funcionar o userRepository
        // D -> Pelo fato de não depender da implementação diretamente
        private userRepository: IUsersRepository, //private vai colocar como uma propriedade para class privada
        private mailProvider: IMailProvider
    ){

    }

    async execute( data: ICreateUserRequestDTO ) {

        const userAlreadyExists = await this.userRepository.FindByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error("User already exists.");
        }

        const user = new User(data);

        await this.userRepository.save(user);

//Usamos A inversão de dependência: Ela é a estratégia de depender de interfaces ou classes abstratas, ao invés de classes concretas.
//Referencia: https://medium.com/contexto-delimitado/o-princ%C3%ADpio-da-invers%C3%A3o-de-depend%C3%AAncia-d52987634fa9
        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: "Rodolfo",
                email: "Rodolfo@teste.com"
            },
            subject: "Seja Bem-Vindo",
            body: "<p>Você já pode acessar </p>"
        })

    }

}