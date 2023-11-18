import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class UpdatePasswordUseCase {
    constructor(readonly userRepository: IUserRepository) {}
    
    async run(
        id: number,
        password: string,
        cpassword: string
    ): Promise<User | null> {
        console.log(password+ "----" + cpassword); 
        try {
            // Validar que las contraseñas coincidan
            if (password !== cpassword) {
                throw new Error("Las contraseñas no coinciden.");
            }

            // Llamar al repositorio para actualizar la contraseña
            const updatePasswordById = await this.userRepository.updatePassword(id, password, cpassword);

            if (updatePasswordById) {
                return updatePasswordById;
            } else {
                throw new Error("Usuario no encontrado o no actualizado.");
            }
        } catch (error: any) {
            console.error("Error al actualizar la contraseña:", error.message);
            throw new Error("Se produjo un error al actualizar la contraseña.");
        }
    }
}
