export class User{
    // _id:string;
	firstname:string;
	lastname:string;
	email:string;
	password:string;
    isadmin:boolean
    constructor( firstname:string, lastname:string, email:string, password:string,isadmin:boolean){
        // this._id=_id;
        this.firstname=firstname;
        this.lastname=lastname;
        this.email=email;
        this.password=password;
        this.isadmin=this.isadmin
    }

}