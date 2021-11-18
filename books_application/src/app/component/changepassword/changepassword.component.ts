import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/user.service';

type changepwd = {
  current_password: string,
  new_password: string,
  confirm_password: string
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  @Output() notify = new EventEmitter()

  change: changepwd = {

    current_password: "",
    new_password: "",
    confirm_password:""
  };

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  changePassword(){

    if(this.change.new_password !== this.change.confirm_password){
      window.alert('Please confirm password once again!')
    }else{
      this._userService.changePassword(this.change).subscribe(
        res => {
          if(res){
            console.log(res)
            window.alert(res)
          }
        },
        err => {
          window.alert(err.error.text);
        })

    }
    this.notify.emit()
  }

}
