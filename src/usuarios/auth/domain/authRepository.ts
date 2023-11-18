export interface AuthRepository {
    login(email:string,password:string):Promise<any | null>
    logout(logoutStatus:boolean):Promise<void>
  }
  