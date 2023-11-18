import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class ListAllUserUseCase {
  constructor(private readonly usuarioRepository: IUserRepository) {}

  /**
   * Obtiene una lista de todos los usuarios activos.
   * @returns Una lista de usuarios activos o null si hay un error.
   * @throws {Error} Si ocurre un error al obtener la lista de usuarios.
   */
  async run(): Promise<User[] | null> {
    try {
      const listAllActiveUser = await this.usuarioRepository.listAllUsers();
      if (listAllActiveUser) {
        return listAllActiveUser;
      } else {
        throw new Error("No se encontraron usuarios activos.");
      }
    } catch (err: any) {
      // Lanza una excepción con un mensaje de error específico.
      throw new Error("Error al obtener la lista de usuarios: " + err.message);
    }
  }
}
