import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class DeleteUserUseCase {
    constructor(readonly userRepository: IUserRepository) {}
    
    /** 
     * Elimina un usuario por su ID.
     * @param id El ID del usuario que se va a eliminar.
     * @returns Un mensaje de éxito o null si se produce un error.
     */
    async run(id: string): Promise<string | null> {
        try {
            // Llama al método de repositorio para eliminar el usuario por su UUID.
            const deleteUser = await this.userRepository.deleteUserById(id);
            
            if (deleteUser) {
                // Si el usuario se eliminó correctamente, devuelve un mensaje de éxito.
                return "Usuario eliminado correctamente." + "id: " + id;
            } else {
                // Si el usuario no se encontró o no se pudo eliminar, devuelve un mensaje de error.
                return "No se pudo eliminar el usuario.";
            }
        } catch (error) {
            // Maneja el error y registra un mensaje de error en la consola.
            console.error("Error al eliminar el usuario:", error);
            
            // Devuelve null para indicar un error.
            return null;
        }
    }
}
