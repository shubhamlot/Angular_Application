export class Books{
    _id:string;
    title:string;
    author:string;
    category:string;
    isbn:string;
    copies:number;
    rented:number;

    constructor(_id:string,title:string,author:string,category:string, isbn: string, copies:number,rented:number){
        this._id=_id;
        this.title=title;
        this.author=author;
        this.category=category;
        this.isbn = isbn;
        this.copies = copies;
        this.rented = rented;
    }

}