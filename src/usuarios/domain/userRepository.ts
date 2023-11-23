import { User, VerifyLogin } from "./user";

export interface IUserRepository {
  registerUser(
    name: string,
    email: string,
    password: string, // Debe almacenarse de forma segura (hash + salt)
    height: number,
    weight: number,
    sex: string,
  ): Promise<User | null>;

  loginUser(
    email:string,
    password:string
):Promise<VerifyLogin | string | null>  //listo


  listAllUsers(): Promise<User[] | null>;

  deleteUserById(id: string): Promise<string | null>;

  getUserById(id: string): Promise<User | null>;

  listAllInactiveUser(): Promise<User[] | User | null>;

  updatePassword(id: number, password: string, cpassword: string): Promise<User | null> 

  setAsInactive(id: number): Promise<number | null>;


  


  updateUsers(
    id: number,
    weight: number
): Promise<User | null>


}