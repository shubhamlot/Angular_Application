export class User{
    // _id:string;
	firstname:string;
	lastname:string;
	email:string;
	password:string;

    constructor(_id:string, firstname:string, lastname:string, email:string, password:string){
        // this._id=_id;
        this.firstname=firstname;
        this.lastname=lastname;
        this.email=email;
        this.password=password;
    }

}