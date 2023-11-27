export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public height: number,
        public weight: number,
        public sex: string,
     ){}
    
  }

  export class VerifyLogin{
    constructor(
        public id: number,
        public name: string,
        public email: string,
     ){}
    
  }
  