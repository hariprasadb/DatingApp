import { Component, OnInit, Input,  EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output()  cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyServiceService) { }

  ngOnInit() {
  }

  register() {
      console.log(this.model);
      this.authService.register(this.model).subscribe(() => {
        this.alertifyService.success('registration successful');
      }, error => {
            this.alertifyService.error(error);
          });
  }
  cancel() {
    this.cancelRegister.emit(false);
    this.alertifyService.message('cancelled');
  }

}
