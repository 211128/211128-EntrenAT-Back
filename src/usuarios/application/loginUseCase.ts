import { VerifyLogin, User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class LoginUseCase {
    constructor(readonly usuarioRepository: IUserRepository) {}
    
    async run(
        email: string,
        password: string
    ): Promise<VerifyLogin | string | null> {
        // Puedes eliminar el código de validación con class-validator

        try {
            const loginUser = await this.usuarioRepository.loginUser(email, password);
            return loginUser;
        } catch (error) {
            return null;
        }
    }
}
