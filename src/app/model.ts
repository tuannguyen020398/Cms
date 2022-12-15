export class ListById {
    id!: number;
    name!: string;
    dob!: Date;
    phoneNumber!: string;
    email!: string;
    sex!: number;
    dateCreated!:Date;
    lastUpdate!:Date;
    status:any=0;
}
export class CreateUserModel {
    id: number=0;
    name!: string;
    dob!: any;
    phoneNumber!: string;
    email!: any;
    sex!: any;
    userName: string='name';
    passwordHash!: string;
    passwordagain!: string;
    dateCreated=new Date();
    lastUpdate= new Date();
    status:any=0;
}
export class LoginModel{
    userName!:string;
    password!:string;
}
export class Filter{
    Keywork?:string='';
    Count?:any=null;
    PageSize:number=5;
    PageIndex!:number;
    StartDob?:any=null;
    EndDob?:any=null;
    totalRows!:number;
}