// Importa la clase User del módulo '../domain/user'
import { User } from "../domain/user";
// Importa la interfaz IUsuarioRepository del módulo '../domain/userRepository'
import { IUserRepository } from "../domain/userRepository";

// Define la clase ListAllUserActiveUseCase
export class ListAllInactiveUserUseCase {
    // Constructor que toma una instancia de IUsuarioRepository como argumento
    constructor(readonly userRepository: IUserRepository) {}
    
    // Método asincrónico 'run' que devuelve una lista de usuarios activos o null en caso de error
    async run(): Promise<User[] | User | null> {
        try {
            // Intenta obtener la lista de usuarios activos llamando al método 'listAllUserIactive' del repositorio
            const listAllUser = await this.userRepository.listAllInactiveUser();
            // Devuelve la lista de usuarios activos
            return listAllUser;
        } catch (error) {
            // Si se produce un error durante la ejecución, captura el error aquí
            console.error("Error en ListAllUserActiveUseCase:", error);
            // Devuelve null para indicar que ha habido un error
            return null;
        }
    }
}
