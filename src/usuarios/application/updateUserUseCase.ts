import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";


export class UpdateUserUseCase {
    constructor(readonly userRepository: IUserRepository) {}
    
    async run(
        id: number,
        weight: number,
        ): Promise<User | null> {
        console.log("updated")
        try {
            const updateUserById = await this.userRepository.updateUsers(id, weight);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}