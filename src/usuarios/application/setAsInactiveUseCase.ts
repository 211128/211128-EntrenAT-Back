import { IUserRepository } from "../domain/userRepository";


export class SetAsInactiveUseCase{
    constructor(readonly userRepository: IUserRepository) {}

    async run(id:number):Promise<number | null>{
        try {
            const deleteUser = await this.userRepository.setAsInactive(id)
            return deleteUser;
        } catch (error) {
            return null;
        }
    }
}
