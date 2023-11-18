import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class RegisterUseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async run(
    name: string,
    email: string,
    password: string, // Debe almacenarse de forma segura (hash + salt)
    height: number,
    weight: number,
    sex: string
  ): Promise<User | null> {
    try {
      const createNewUser = await this.userRepository.registerUser(
        name,
        email,
        password,
        height,
        weight,
        sex,
      );


      return createNewUser;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return null; 
    }
  }
}
