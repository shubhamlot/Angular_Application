import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  @Output() notify = new EventEmitter()

  current_password: string;
  new_password: string;
  confirm_password: string;

  constructor() { }

  ngOnInit(): void {
  }

  changePassword(){

    this.notify.emit()
  }

}
