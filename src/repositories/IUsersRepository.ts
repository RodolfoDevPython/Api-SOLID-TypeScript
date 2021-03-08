import { User } from "../entities/User";

export interface IUsersRepository {

    FindByEmail(email:string): Promise<User>;
    save(user: User): Promise<void>;

}
// Interface para os Cases dos Usuarios