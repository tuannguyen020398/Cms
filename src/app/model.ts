export class ListById {
    id!: number;
    name!: string;
    dob!: Date;
    phoneNumber!: string;
    email!: string;
    gt!: number
}
export class CreateUserModel {
    id: number=0;
    name!: string;
    dob!: Date;
    phoneNumber!: string;
    email!: string;
    gt!: number;
    userName: string='name';
    passwordHash!: string;
    passwordagain!: string;
}
export class LoginModel{
    email!:string;
    password!:string;
}
export class Filter{
    Keywork?:string='';
    Count?:any='';
    PageSize!:number;
    PageIndex!:number;
    Dob?:any='';
}